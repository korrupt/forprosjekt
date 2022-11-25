import {
  CreateUserAuthModel,
  CreateUserModel,
  LoginWithEmailPasswordModel,
  RegisterWithEmailPasswordModel,
} from '@forprosjekt/shared/models';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './user.dto';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAuthDto implements CreateUserAuthModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

@InputType()
export class RegisterWithEmailPasswordDto implements RegisterWithEmailPasswordModel {
  @IsNotEmpty()
  @Type(() => CreateUserDto)
  @Field(() => String)
  user: CreateUserModel;

  @IsNotEmpty()
  @Type(() => CreateUserAuthDto)
  @Field(() => String)
  auth: CreateUserAuthModel;
}

@InputType()
export class LoginWithEmailPasswordDto implements LoginWithEmailPasswordModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}
