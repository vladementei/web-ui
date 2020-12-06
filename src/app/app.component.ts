import { Component } from '@angular/core';
import {RxUnsubscribe} from './core/services/rx-unsubscribe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RxUnsubscribe {

  constructor() {
    super();
  }
}
