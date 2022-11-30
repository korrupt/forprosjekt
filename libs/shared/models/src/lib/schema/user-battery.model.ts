import { BatteryManagerType } from '../common';
import { BatteryModel } from './battery.model';
import { UserModel } from './user.model';

export interface UserBatteryModel {
  user?: UserModel;
  userId: string;
  battery?: BatteryModel;
  batteryId: string;
  type: BatteryManagerType;
}

export interface CreateUserBatteryModel {
  userId: string;
  batteryId: string;
  type: BatteryManagerType;
  ownerId?: string;
}

export interface UpdateUserBatteryModel {
  type?: BatteryManagerType;
  ownerId?: string;
}
