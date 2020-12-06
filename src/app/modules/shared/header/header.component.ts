import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RxUnsubscribe} from '../../../core/services/rx-unsubscribe';
import {Router} from '@angular/router';
import {RoutingConstants} from '../../../constants/routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends RxUnsubscribe {

  constructor(private router: Router) {
    super();
  }

  navigateHome() {
    this.router.navigate([RoutingConstants.MAIN]);
  }
}
