import { BatteryManagerType, CreateUserBatteryModel, UpdateUserBatteryModel } from '@forprosjekt/shared/models';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateUserBatteryDto implements CreateUserBatteryModel {
  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  userId: string;

  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  batteryId: string;

  @IsNotEmpty()
  @IsEnum(BatteryManagerType)
  @Field(() => String)
  type: BatteryManagerType;
}

export class UpdateUserBatteryDto implements UpdateUserBatteryModel {
  @IsOptional()
  @IsEnum(BatteryManagerType)
  @Field(() => String, { nullable: true })
  type?: BatteryManagerType;
}
