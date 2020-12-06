export class SendImage {
  static readonly type = '[Root] send image'
  constructor(public file: File) {
  }
}
export class SetEmbedded {
  static readonly type = '[Root] set embedded'
  constructor(public isEmbedded: boolean) {
  }
}

