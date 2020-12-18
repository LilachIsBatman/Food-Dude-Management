import {User} from './user.interface';
import {Restaurant} from './restaurant.interface';

export interface Review {
  id: number;
  user: User;
  restaurant: Restaurant;
  content: string;
  creationDate: Date;
}


