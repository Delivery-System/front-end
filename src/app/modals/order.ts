// built-in module

// custom module
import { UserProfile } from '../modals/userProfile'
import { Item } from '../modals/item';
import { Status } from '../modals/status';
import { User } from './user';

export interface Order{
     _id: String;
     success:boolean;
     item: Item;
     sourceAddress: String;
     destinationAddress: String;
     deliveryDate: Date;
     status: Status;
     orderer: User;
     receiver: User;
     assignee: User;
}

export interface CancelOrder{
     success:boolean;
     message:string;
     reason:string;
     fee:number;
    order:Order
}