import { CreateBatteryModel, UpdateBatteryModel } from '@forprosjekt/shared/models';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsOptional()
  @IsUUID('4')
  @Field(() => ID, { nullable: true })
  ownerId?: string;
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

  @IsOptional()
  @IsUUID('4')
  @Field(() => ID, { nullable: true })
  ownerId?: string;
}
