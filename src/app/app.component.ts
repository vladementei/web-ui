import { Component } from '@angular/core';
import {RxUnsubscribe} from './core/services/rx-unsubscribe';
import {RestService} from './core/services/rest-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RxUnsubscribe {

  constructor(private restService: RestService) {
    super();
    this.restService.updateServerUrls();
  }
}
