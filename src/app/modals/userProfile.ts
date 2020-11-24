// built-in modules
// custom modules
import { Role } from './role';

export interface UserProfile{
    role:Role,
    firstName: String;
    lastName: String;
    username: String;
    email: String;
    password: String;
    address: String;
    phoneNumber: String;
}