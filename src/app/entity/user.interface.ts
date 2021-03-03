import {Address} from './address.interface';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  role: 'admin' | 'viewer';
}
