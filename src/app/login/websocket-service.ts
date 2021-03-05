import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public openWebsocket(token: string): void {
    // @ts-ignore
    const socket = socketIo.connect('wss://food-dude.herokuapp.com', {query: {token}});
  }
}
