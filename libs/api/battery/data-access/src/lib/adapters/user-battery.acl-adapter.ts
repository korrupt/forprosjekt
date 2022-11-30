import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiUserBatteryService } from '../services';
import { AuthUser } from '@forprosjekt/api/auth/utils';
import { Battery, CreateUserBatteryDto } from '@forprosjekt/api/battery/utils';
import { AccessResource, BatteryManagerType } from '@forprosjekt/shared/models';
import { User } from '@forprosjekt/api/user/utils';

@Injectable()
export class ApiUserBatteryAclAdapter {
  constructor(private battery: ApiUserBatteryService, private userBattery: ApiUserBatteryService) {}

  public async createUserBattery(auth: AuthUser, body: CreateUserBatteryDto) {
    if (!auth.id) throw new UnauthorizedException();
    const permission = auth.create(null, AccessResource.USER_BATTERY);
    if (!permission.granted) {
      console.log('?+');
      throw new ForbiddenException();
    }
    // console.log(permission);
    // if (!permission.granted) {
    //   const type = await this.userBattery.getBatteryManagerType(batteryId, auth.id);
    //   if (!type || type !== BatteryManagerType.ADMIN) {
    //     throw new ForbiddenException('Not admin.');
    //   }
    // }

    const entity = await this.userBattery.create(body);

    const newPermission = auth.read({ ownerId: auth.id }, AccessResource.USER_BATTERY); // override logic
    if (!newPermission.granted) throw new ForbiddenException();

    return newPermission.filter(entity);
  }

  public async findUserBatteries(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.USER_BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.userBattery.find();
    return permission.filter(result);
  }

  public async findOneBattery(auth: AuthUser, userBatteryId: string) {
    const permission = auth.read({ ownerId: userBatteryId }, AccessResource.USER_BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.userBattery.findOne(userBatteryId, true);
    return permission.filter(result);
  }

  public async findFromUserRelation(auth: AuthUser, user: User) {
    const permission = auth.read({ ownerId: auth.id }, AccessResource.USER_BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.userBattery.findFromUserRelation(user);
    return result ? permission.filter(result) : null;
  }

  public async findFromBatteryRelation(auth: AuthUser, battery: Battery) {
    const permission = auth.read(null, AccessResource.USER_BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.userBattery.findFromBatteryRelation(battery);
    return result ? permission.filter(result) : null;
  }
}
