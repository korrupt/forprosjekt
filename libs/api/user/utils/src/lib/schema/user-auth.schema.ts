import { UserAuthModel } from '@forprosjekt/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class UserAuth implements UserAuthModel {
  @Prop()
  salt: string;

  @Prop()
  hash: string;

  @Prop()
  email: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  user: User;
}

export type UserAuthDocument = HydratedDocument<UserAuth>;

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
