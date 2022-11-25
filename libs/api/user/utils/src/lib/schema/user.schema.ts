import { UserModel } from '@forprosjekt/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User implements UserModel {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
