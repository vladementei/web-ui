import {Component, OnInit} from '@angular/core';
import {RxUnsubscribe} from './core/services/rx-unsubscribe';
import {RestService} from './core/services/rest-service.service';
import {merge, Observable, of} from 'rxjs';
import {ActivationStart, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RxUnsubscribe implements OnInit {

  isEmbedded$: Observable<boolean>;

  constructor(private restService: RestService,
              private router: Router) {
    super();
    this.restService.updateServerUrls();
  }

  ngOnInit(): void {
    this.isEmbedded$ = merge(of(true), this.router.events.pipe(
      filter(event => event instanceof ActivationStart),
      map((event: ActivationStart) => event.snapshot.queryParams.embedded === 'true')
    ));
  }
}
