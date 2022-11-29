import { CreateUserModel, UpdateUserModel } from '@forprosjekt/shared/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto implements CreateUserModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdateUserDto implements UpdateUserModel {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;
}
