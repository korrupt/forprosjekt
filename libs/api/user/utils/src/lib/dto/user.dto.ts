import { CreateUserModel } from '@forprosjekt/shared/models';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto implements CreateUserModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
