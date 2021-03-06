export class Token {
  accessToken: string;
  tokenType: string;
  sessionState: string;
  expiresIn: number;
  notBeforePolicy: string;
  expiryDateTime: number;
  idToken?: string;
}
