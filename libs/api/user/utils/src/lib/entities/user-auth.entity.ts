import { UserAuthModel } from '@forprosjekt/shared/models';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, JoinColumn } from 'typeorm';

export enum UserAuthConstraints {
  EMAIL = 'UQ_USER_AUTH_EMAIL',
}

@ObjectType()
@Entity('user_auth')
@Unique(UserAuthConstraints.EMAIL, ['email'])
export class UserAuth implements UserAuthModel {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
