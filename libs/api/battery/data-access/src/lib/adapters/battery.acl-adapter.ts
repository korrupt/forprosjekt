import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiBatteryService, ApiUserBatteryService } from '../services';
import { AuthUser } from '@forprosjekt/api/auth/utils';
import { CreateBatteryDto, UpdateBatteryDto } from '@forprosjekt/api/battery/utils';
import { AccessResource, BatteryManagerType } from '@forprosjekt/shared/models';

@Injectable()
export class ApiBatteryAclAdapter {
  constructor(private battery: ApiBatteryService, private userBattery: ApiUserBatteryService) {}

  public async findLatestBatterySnapshot(auth: AuthUser, batteryId: string) {
    if (!auth.id) throw new UnauthorizedException();

    const permission = auth.read(null, AccessResource.BATTERY_SNAPSHOT);
    if (!permission.granted) {
      const type = await this.userBattery.getBatteryManagerType(batteryId, auth.id);
      if (!type) {
        throw new ForbiddenException('Not admin.');
      }
    }

    const snapshot = await this.battery.getLatestSnapshot(batteryId);
    const newPermission = auth.read({ ownerId: auth.id }, AccessResource.BATTERY_SNAPSHOT);

    if (!newPermission.granted) {
      throw new ForbiddenException();
    }

    return snapshot ? newPermission.filter(snapshot) : null;
  }

  public async createBattery(auth: AuthUser, body: CreateBatteryDto) {
    const permission = auth.create(null, AccessResource.BATTERY); // create:any
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto = permission.filter(body);
    return this.battery.create(filteredDto, auth.id);
  }

  public async findBattery(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.battery.find();
    return permission.filter(result);
  }

  public async findOneBattery(auth: AuthUser, batteryId: string) {
    if (!auth.id) throw new UnauthorizedException();

    const permission = auth.read(null, AccessResource.BATTERY); //read:any
    if (!permission.granted) {
      const type = await this.userBattery.getBatteryManagerType(batteryId, auth.id);
      if (!type) {
        throw new ForbiddenException('Not admin.');
      }
    }

    const entity = await this.battery.findOne(batteryId, true);

    const newPermission = auth.read({ ownerId: auth.id }, AccessResource.BATTERY); // override logic
    if (!newPermission.granted) throw new ForbiddenException();

    return newPermission.filter(entity);
  }

  public async updateBattery(auth: AuthUser, batteryId: string, body: UpdateBatteryDto) {
    if (!auth.id) throw new UnauthorizedException();
    const permission = auth.update(null, AccessResource.BATTERY);

    if (!permission.granted) {
      const type = await this.userBattery.getBatteryManagerType(batteryId, auth.id);
      if (!type || type !== BatteryManagerType.ADMIN) {
        throw new ForbiddenException('Not admin.');
      }
    }

    const filteredDto = permission.filter(body);
    const result = await this.battery.update(batteryId, filteredDto);

    const readPermission = auth.read({ ownerId: auth.id }, AccessResource.BATTERY); // override logic
    if (readPermission.granted) throw new ForbiddenException();

    return result;
  }
}
