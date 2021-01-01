import {User} from './user.interface';
import {Restaurant} from './restaurant.interface';

export interface Review {
  _id: string;
  user: User;
  restaurant: Restaurant;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


