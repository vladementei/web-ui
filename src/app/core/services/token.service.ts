import {Injectable} from "@angular/core";
import {RxUnsubscribe} from "./rx-unsubscribe";
import {Token} from "../../models/token.model";

@Injectable()
export class TokenService extends RxUnsubscribe {

  private token: Token;

  constructor() {
    super();
  }

  public getToken(): Token {
    let self = this;
    if (self.token === undefined || self.token.accessToken === "") {
      self.token = JSON.parse(sessionStorage.getItem("token")) || undefined;
    }

    if (self.token && Date.now() > self.token.expiryDateTime) {
      self.deleteToken();
    }

    return self.token;
  }

  public deleteToken(): void {
    this.token = undefined;
    sessionStorage.removeItem("token");
  }
}
