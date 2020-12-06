import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {RxUnsubscribe} from '../../core/services/rx-unsubscribe';
import {RestService} from '../../core/services/rest-service.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadingComponent extends RxUnsubscribe {

  imageSrc: string;
  selectedFile: File;

  constructor(private restService: RestService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  previewFile(file: File): void {
    this.imageSrc = null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (() => {
        this.imageSrc = reader.result.toString();
        this.cdr.detectChanges();
      });
      reader.readAsDataURL(file);
    }
    this.selectedFile = file;
  }

  uploadImage(): void {
    this.restService.sendImage(this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
