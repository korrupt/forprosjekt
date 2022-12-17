import { Module } from '@nestjs/common';
import { Battery, BatterySnapshot, UserBattery } from '@forprosjekt/api/battery/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@forprosjekt/api/user/utils';
import {
  ApiBatteryAclAdapter,
  ApiBatteryResolver,
  ApiBatteryService,
  ApiUserBatteryAclAdapter,
  ApiUserBatteryResolver,
  ApiUserBatteryService,
} from '@forprosjekt/api/battery/data-access';
import { ApiMqttModule } from '@forprosjekt/api/mqtt/feature';
import { ApiBatteryController } from './controllers/battery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Battery, BatterySnapshot, UserBattery]), ApiMqttModule],
  providers: [
    ApiBatteryService,
    ApiBatteryAclAdapter,
    ApiBatteryResolver,
    ApiUserBatteryService,
    ApiUserBatteryAclAdapter,
    ApiUserBatteryResolver,
  ],
  exports: [ApiUserBatteryAclAdapter, ApiUserBatteryResolver],
  controllers: [ApiBatteryController],
})
export class ApiBatteryModule {}
