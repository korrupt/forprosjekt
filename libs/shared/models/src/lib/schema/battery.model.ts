import { CoreEntityModel } from './core-entity.model';

export interface BatteryModel extends CoreEntityModel {
  name: string;
  longitude?: string;
  latitude?: string;
}

// export interface UserBatteryModel {}
