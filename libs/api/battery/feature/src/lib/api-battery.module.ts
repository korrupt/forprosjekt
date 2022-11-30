import { Module } from '@nestjs/common';
import { Battery, UserBattery } from '@forprosjekt/api/battery/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@forprosjekt/api/user/utils';

@Module({
  imports: [TypeOrmModule.forFeature([User, Battery, UserBattery])],
})
export class ApiBatteryModule {}
