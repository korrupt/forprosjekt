import {
  CreateUserAuthModel,
  CreateUserModel,
  LoginWithEmailPasswordModel,
  RegisterWithEmailPasswordModel,
} from '@forprosjekt/shared/models';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './user.dto';

export class CreateUserAuthDto implements CreateUserAuthModel {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterWithEmailPasswordDto implements RegisterWithEmailPasswordModel {
  @IsNotEmpty()
  @Type(() => CreateUserDto)
  user: CreateUserModel;

  @IsNotEmpty()
  @Type(() => CreateUserAuthDto)
  auth: CreateUserAuthModel;
}

export class LoginWithEmailPasswordDto implements LoginWithEmailPasswordModel {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
