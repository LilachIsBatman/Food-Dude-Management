import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Store} from '@ngrx/store';
import {AuthState} from './reducer/auth.reducer';
import {connectedUsers} from './actions/auth.action';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private store: Store<AuthState>) {
  }

  public openWebsocket(token: string): void {
    // @ts-ignore
    const socket = socketIo.connect('wss://food-dude.herokuapp.com', {query: {token}});
    socket.on('CONNECTED_USERS', users =>  this.store.dispatch(connectedUsers({ users })));
  }
}
