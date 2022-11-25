import { UserAuthModel } from '@forprosjekt/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Field } from '@nestjs/graphql';

@Schema()
export class UserAuth implements UserAuthModel {
  @Field(() => String)
  _id: Types.ObjectId | string;

  @Field(() => String)
  @Prop()
  salt: string;

  @Field(() => String)
  @Prop()
  hash: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument;
}

export type UserAuthDocument = HydratedDocument<UserAuth>;

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
