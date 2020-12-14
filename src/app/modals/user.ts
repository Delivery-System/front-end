import { Role } from './role';

class Account {
  public role: Role;
  public firstName: String;
  public lastName: String;
  public username: String;
  public email: String;
  public password: String;
  public confirmPassword: String
}

export class User {
  public _id: String;
  public account: Account;
  public address: String;
  public phoneNumber: String;
}