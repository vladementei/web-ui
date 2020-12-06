import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RxUnsubscribe} from '../../core/services/rx-unsubscribe';
import abcjs from 'abcjs';
import * as midiParser from 'midi-parser-js';
import * as soundFont from 'soundfont-player';

@Component({
  selector: 'animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationComponent extends RxUnsubscribe implements OnInit {

  @ViewChild('musicSheet') musicSheet;
  musicSheetWidth = 700;
  musicEditor;
  timingCallbacks;
  isAnimationWorks: boolean = undefined;
  music: string;
  cursorScroller: number;
  isMobileView: boolean = false;
  private selectedMidiFile: File;


  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.music = this.updateMusicSheetToView('G4 c4 d2 d2 d2 B2 A4 A4 A4 d4 |\n' +
      ' d2 e2 e2 c2 B4 G4 B4 e4 e2 f2 e2 e2 |\n' +
      ' B4 G2 G2 d2 B4 c4 |\n' +
      ' c4 c2 d2 c2 B2 A4 A4 A4 d4 |\n' +
      ' d2 e2 d2 c2 B2 G2 B2 e4 e2 f2 e2 d2 |\n' +
      ' d4 A4 G2 G2 A4 d2 B4 c4 |');
    this.cdr.detectChanges();

    const abcjsParams: any = {
      add_classes: true,
    }
    if (this.isMobileView) {
      abcjsParams.staffwidth = 80000;
    }
    this.musicEditor = new abcjs.Editor(
      'musicInput', {
        paper_id: 'musicSheet',
        warnings_id: 'warnings',
        abcjsParams: abcjsParams
      }
    );

    if (this.isMobileView) {
      this.updateMusicSheetWidth();
    }

    this.cdr.detectChanges();
  }

  uploadMidi(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (() => {
        const midiArray = midiParser.parse(reader.result);
        console.log(midiArray);
      });
      reader.readAsDataURL(file);
    }
    this.selectedMidiFile = file;
  }

  animate(): void {
    this.stopCursorScroller();
    if (this.timingCallbacks) {
      this.timingCallbacks.stop();
    }
    const params = {showCursor: true};
    const sheet = this.musicSheet.nativeElement;
    const audioContext = new AudioContext();
    this.timingCallbacks = new abcjs.TimingCallbacks(this.musicEditor.tunes[0], {
      eventCallback: (midiEvent) => {
        if (midiEvent) {
          const note = this.music.slice(midiEvent.startChar, midiEvent?.endChar)?.trim();
          if (note) {
            console.log(note);
            soundFont.instrument(audioContext, 'acoustic_guitar_nylon').then((piano) => {
              piano.play(note);
            });
          }
        }
      }
    });
    abcjs.startAnimation(sheet, this.musicEditor.tunes[0], params);
    this.timingCallbacks.start();
    this.isAnimationWorks = true;

    if (this.isMobileView) {
      const cursor = document.getElementsByClassName('abcjs-cursor cursor')[0];
      this.cursorScroller = window.setInterval(() => cursor.scrollIntoView({behavior: 'smooth', inline: "center"}), 500);
    }
  }

  pause(): void {
    this.stopCursorScroller();
    abcjs.pauseAnimation(this.isAnimationWorks);
    this.isAnimationWorks ? this.timingCallbacks.pause() : this.timingCallbacks.start();
    this.isAnimationWorks = !this.isAnimationWorks;
  }

  stopCursorScroller(): void {
    if (this.cursorScroller) {
      clearInterval(this.cursorScroller);
      this.cursorScroller = null;
    }
  }

  updateMusicSheetWidth(): void {
    const width: number = Math.floor((this.musicSheet?.nativeElement?.firstChild?.lastChild?.x?.baseVal?.value || this.musicSheetWidth) + 40);
    if (this.musicSheet?.nativeElement?.firstChild?.width?.baseVal?.value && width) {
      this.musicSheet.nativeElement.firstChild.width.baseVal.value = width;
      this.musicSheetWidth = width;
    }
  }

  updateMusicSheetToView(music: string): string {
    return this.isMobileView ? music.replace(/[\|\n]/g, '') : music;
  }

  onMusicChange() {
    this.cdr.detectChanges();
    this.updateMusicSheetWidth();
    this.cdr.detectChanges();
  }
}
