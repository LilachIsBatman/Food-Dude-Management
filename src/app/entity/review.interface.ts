import {User} from './user.interface';
import {Restaurant} from './restaurant.interface';

export interface Review {
  _id: number;
  user: User;
  restaurant: Restaurant;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


