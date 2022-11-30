import { CreateBatteryModel, UpdateBatteryModel } from '@forprosjekt/shared/models';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBatteryDto implements CreateBatteryModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => String, { nullable: true })
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => String, { nullable: true })
  latitude?: string;
}

@InputType()
export class UpdateBatteryDto implements UpdateBatteryModel {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => String, { nullable: true })
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => String, { nullable: true })
  latitude?: string;
}
