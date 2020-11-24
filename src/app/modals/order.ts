// built-in module

// custom module
import { UserProfile } from '../modals/userProfile'
import { Item } from '../modals/item';
import { Status } from '../modals/status';

export interface Order{
     _id: String;
     item: Item;
     sourceAddress: String;
     destinationAddress: String;
     deliveryDate: Date;
     status: Status;
     orderer: UserProfile;
     receiver: UserProfile;
     assignee: UserProfile;
}