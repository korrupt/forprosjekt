import { CoreEntity } from '@forprosjekt/api/database/utils';
import { UserModel } from '@forprosjekt/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity()
export class User extends CoreEntity implements UserModel {
  @Field(() => String)
  @Column()
  name: string;
}
