import { CreateUserModel } from '@forprosjekt/shared/models';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserModel {
  @IsNotEmpty()
  @IsString()
  name: string;
}
