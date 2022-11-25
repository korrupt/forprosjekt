import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@forprosjekt/api/user/utils';
import { Model } from 'mongoose';

@Injectable()
export class ApiUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public findUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
