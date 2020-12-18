import {Address} from './address.interface';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}
