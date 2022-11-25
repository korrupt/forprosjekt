import { CreateUserModel } from './user.model';

export interface UserAuthModel {
  email: string;
  salt: string;
  hash: string;
}

export interface CreateUserAuthModel {
  email: string;
  password: string;
}

export interface RegisterWithEmailPasswordModel {
  user: CreateUserModel;
  auth: CreateUserAuthModel;
}

export interface LoginWithEmailPasswordModel {
  email: string;
  password: string;
}
