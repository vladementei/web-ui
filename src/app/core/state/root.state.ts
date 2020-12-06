import {NgxsOnInit, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';

export interface RootStateModel {
}

@State<RootStateModel>({
  name: 'root',
  defaults: {},
  children: []
})
@Injectable()
export class RootState implements NgxsOnInit {

  constructor(private store: Store) {
  }

  ngxsOnInit(ctx?: StateContext<string | null>): any {
    //add callbacks and request
  }
}
