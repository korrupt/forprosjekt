import { BatteryManagerType, CreateUserBatteryModel, UpdateUserBatteryModel } from '@forprosjekt/shared/models';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateUserBatteryDto implements CreateUserBatteryModel {
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  @IsNotEmpty()
  @IsUUID('4')
  batteryId: string;

  @IsNotEmpty()
  @IsEnum(BatteryManagerType)
  type: BatteryManagerType;

  @IsOptional()
  @IsUUID('4')
  ownerId: string;
}

export class UpdateUserBatteryDto implements UpdateUserBatteryModel {
  @IsOptional()
  @IsEnum(BatteryManagerType)
  type: BatteryManagerType;

  @IsOptional()
  @IsUUID('4')
  ownerId: string;
}
