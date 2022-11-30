import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApiBatteryService } from '../services';
import { AuthUser } from '@forprosjekt/api/auth/utils';
import { CreateBatteryDto, UpdateBatteryDto } from '@forprosjekt/api/battery/utils';
import { AccessResource } from '@forprosjekt/shared/models';

@Injectable()
export class ApiBatteryAclAdapter {
  constructor(private battery: ApiBatteryService) {}

  public async createBattery(auth: AuthUser, body: CreateBatteryDto) {
    const permission = auth.create({ ownerId: auth.id }, AccessResource.BATTERY);
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
    const entity = await this.battery.findOne(batteryId, true);
    const permission = auth.read(entity, AccessResource.BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(entity);
  }

  public async updateBattery(auth: AuthUser, batteryId: string, body: UpdateBatteryDto) {
    const entity = await this.battery.findOne(batteryId, true);
    const permission = auth.update(entity, AccessResource.BATTERY);
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto = permission.filter(body);
    const result = await this.battery.update(batteryId, filteredDto);

    const readPermission = auth.read(entity, AccessResource.BATTERY);
    if (readPermission.granted) throw new ForbiddenException();

    return readPermission.filter(result);
  }
}
