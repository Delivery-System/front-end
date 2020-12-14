// built-in module

// custom module
import { UserProfile } from '../modals/userProfile'
import { Item } from '../modals/item';
import { Status } from '../modals/status';
import { User } from './user';

export interface Order{
     _id: String;
     item: Item;
     sourceAddress: String;
     destinationAddress: String;
     deliveryDate: Date;
     status: Status;
     orderer: User;
     receiver: User;
     assignee: User;
}