export class SendImage {
  static readonly type = '[Root] send image'
  constructor(public file: File) {
  }
}
