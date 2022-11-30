import { CreateBatteryModel, UpdateBatteryModel } from '@forprosjekt/shared/models';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateBatteryDto implements CreateBatteryModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  latitude?: string;
}

export class UpdateBatteryDto implements UpdateBatteryModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  latitude?: string;
}
