import {Address} from '../entity/address.interface';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  location: Address;
}
