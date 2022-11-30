import { CoreEntityModel } from './core-entity.model';

export interface BatteryModel extends Omit<CoreEntityModel, 'ownerId'> {
  name: string;
  longitude?: string;
  latitude?: string;
}

export interface CreateBatteryModel {
  name: string;
  longitude?: string;
  latitude?: string;
}

export interface UpdateBatteryModel {
  name?: string;
  longitude?: string;
  latitude?: string;
}
