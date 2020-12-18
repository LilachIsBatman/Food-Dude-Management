import {Category} from './category.interface';
import {Address} from './address.interface';

export interface Restaurant {
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
  category: Category;
  address: Address;
}
