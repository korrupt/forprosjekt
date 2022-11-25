import { UserAuthModel } from '@forprosjekt/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Schema()
export class UserAuth implements UserAuthModel {
  @Prop()
  salt: string;

  @Prop()
  hash: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument;
}

export type UserAuthDocument = HydratedDocument<UserAuth>;

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
