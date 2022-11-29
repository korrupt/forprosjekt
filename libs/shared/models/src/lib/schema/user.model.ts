import { CoreEntityModel } from './core-entity.model';

export interface UserModel extends CoreEntityModel {
  name: string;
}

export interface CreateUserModel {
  name: string;
}

export interface UpdateUserModel {
  name?: string;
}
