import { UserAuthModel } from '@forprosjekt/shared/models';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, Unique, OneToOne, JoinColumn } from 'typeorm';
import { CoreEntity } from '@forprosjekt/api/database/utils';

export enum UserAuthConstraints {
  EMAIL = 'UQ_USER_AUTH_EMAIL',
}

@ObjectType()
@Entity('user_auth')
@Unique(UserAuthConstraints.EMAIL, ['email'])
export class UserAuth extends CoreEntity implements UserAuthModel {
  @Field(() => String)
  @Column()
  salt: string;

  @Field(() => String)
  @Column()
  hash: string;

  @Field(() => String)
  @Column()
  email: string;

  @Column()
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
