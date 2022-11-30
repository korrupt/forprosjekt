import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApiUserBatteryService } from '../services';
import { AuthUser } from '@forprosjekt/api/auth/utils';
import { CreateUserBatteryDto } from '@forprosjekt/api/battery/utils';
import { AccessResource } from '@forprosjekt/shared/models';

@Injectable()
export class ApiUserBatteryAclAdapter {
  constructor(private battery: ApiUserBatteryService) {}

  // public async createUserBattery(auth: AuthUser, body: CreateUserBatteryDto) {
  //   const { ownerId } = body;
  //   const permission = auth.create({ ownerId: ownerId || auth.id }, AccessResource.USER_BATTERY);
  //   if (!permission.granted) throw new ForbiddenException();

  //   const filteredDto = permission.filter(body);
  //   return this.battery.create(filteredDto, ownerId);
  // }

  // public async findBattery(auth: AuthUser) {
  //   const permission = auth.read(null, AccessResource.BATTERY);
  //   if (!permission.granted) throw new ForbiddenException();

  //   const result = await this.battery.find();
  //   return permission.filter(result);
  // }

  // public async findOneBattery(auth: AuthUser, batteryId: string) {
  //   const entity = await this.battery.findOne(batteryId, true);
  //   const permission = auth.read(entity, AccessResource.BATTERY);
  //   if (!permission.granted) throw new ForbiddenException();

  //   return permission.filter(entity);
  // }

  // public async updateBattery(auth: AuthUser, batteryId: string, body: UpdateBatteryDto) {
  //   const entity = await this.battery.findOne(batteryId, true);
  //   const permission = auth.update(entity, AccessResource.BATTERY);
  //   if (!permission.granted) throw new ForbiddenException();

  //   const filteredDto = permission.filter(body);
  //   const result = await this.battery.update(batteryId, filteredDto);

  //   const readPermission = auth.read(entity, AccessResource.BATTERY);
  //   if (readPermission.granted) throw new ForbiddenException();

  //   return readPermission.filter(result);
  // }
}
