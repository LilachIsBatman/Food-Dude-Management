import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Store} from '@ngrx/store';
import {AuthState} from './reducer/auth.reducer';
import {connectedUsers} from './actions/auth.action';
import {updateRestaurant, updateRestaurantBlockReviews, updateRestaurantSuccess} from '../restaurants/actions/restaurant.action';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;

  constructor(private store: Store<AuthState>) {
  }

  public openWebsocket(token: string): void {
    // @ts-ignore
    this.socket = socketIo.connect('wss://food-dude.herokuapp.com', {query: {token}});
    this.socket.on('CONNECTED_USERS', users =>  this.store.dispatch(connectedUsers({ users })));
    this.socket.on('BLOCK_RESTAURANT_REVIEWS_CHANGED', ({restaurantId, reviewsBlocked}) =>
      this.updateRestaurant(restaurantId, reviewsBlocked));
  }

  public blockRestaurantReviews(restaurantId: string): void {
    if (!!this.socket) {
      this.socket.emit('CHANGE_BLOCK_RESTAURANT_REVIEWS', { restaurantId, block: true });
    }
  }

  public allowRestaurantReviews(restaurantId: string): void {
    if (!!this.socket) {
      this.socket.emit('CHANGE_BLOCK_RESTAURANT_REVIEWS', { restaurantId, block: false });
    }
  }

  private updateRestaurant(restaurantId: string, reviewsBlocked: boolean): void {
    this.store.dispatch(updateRestaurantBlockReviews({restaurantId, reviewsBlocked}));
  }
}
