import { AccessRole } from '../common';
import { CoreEntityModel } from './core-entity.model';

export interface UserModel extends CoreEntityModel {
  name: string;
  roles: AccessRole[];
}

export interface CreateUserModel {
  name: string;
}

export interface UpdateUserModel {
  name?: string;
}
