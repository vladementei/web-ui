import * as jsonMidi from '../../assets/data/midi-dictionary.json';


export function midiToNotes(midiArray): string {
  let notesTxt = '';
  const tactThreshold = 16;
  const lineThreshold = 32;
  let lastTact = 0;
  let lastLine = 0;
  let sumDlit = 0;
  for (let i = 1; i < midiArray.track[1].event.length - 1; i++) {
    if (midiArray.track[1].event[i].deltaTime != 0) {
      const dlit = jsonMidi['Duration'][midiArray.track[1].event[i].deltaTime]['display'];
      notesTxt += jsonMidi['Notes'][midiArray.track[1].event[i].data.slice(0, 1)]['display'] + dlit + ' ';
      sumDlit += Number.parseInt(dlit);
      if (sumDlit - lastTact >= tactThreshold) {
        notesTxt += '|';
        lastTact = sumDlit;
      }
      if (sumDlit - lastLine >= lineThreshold) {
        notesTxt += '\n';
        lastLine = sumDlit;
      }
    }
  }
  return notesTxt;
}
