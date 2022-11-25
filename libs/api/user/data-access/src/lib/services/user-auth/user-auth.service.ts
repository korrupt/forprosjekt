import {
  LoginWithEmailPasswordDto,
  RegisterWithEmailPasswordDto,
  User,
  UserAuth,
  UserAuthDocument,
  UserDocument,
} from '@forprosjekt/api/user/utils';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class ApiUserAuthService {
  constructor(
    @InjectModel(UserAuth.name) private userAuthModel: Model<UserAuthDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private async findUserAuthByEmail(email: string): Promise<UserAuth | null> {
    const found = await this.userAuthModel.findOne({ email }).exec();
    return found;
  }

  public async registerWithEmailPassword(dto: RegisterWithEmailPasswordDto) {
    const { user: _user, auth: _auth } = dto;

    // check if email is in use
    const exists = await this.findUserAuthByEmail(_auth.email);
    if (!exists) {
      throw new ForbiddenException(`Email is already in use.`);
    }

    const user = await this.userModel.create(_user);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(_auth.password, salt);

    const auth = await this.userAuthModel.create({ email: _auth.email, salt, hash, user });

    return { id: user._id, email: auth.email };
  }

  public async loginWithEmailPassword(dto: LoginWithEmailPasswordDto) {
    const { email, password } = dto;
    const userAuth = await this.userAuthModel.findOne({ email }).populate('user').exec();

    if (!userAuth) {
      throw new NotFoundException(`User/Password combination wrong`);
    }

    const hash = await bcrypt.hash(password, userAuth.salt);

    if (hash !== userAuth.hash) {
      throw new ForbiddenException(`User/Password combination wrong`);
    }

    return { id: userAuth.user._id, email };
  }
}
