import { Module } from '@nestjs/common';
import { Battery, UserBattery } from '@forprosjekt/api/battery/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@forprosjekt/api/user/utils';
import { ApiBatteryService } from '@forprosjekt/api/battery/data-access';

@Module({
  imports: [TypeOrmModule.forFeature([User, Battery, UserBattery])],
  providers: [ApiBatteryService],
})
export class ApiBatteryModule {}
