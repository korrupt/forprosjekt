import { LoginWithEmailPasswordDto, RegisterWithEmailPasswordDto, User, UserAuth } from '@forprosjekt/api/user/utils';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { ApiAuthService } from '@forprosjekt/api/auth/data-access';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiUserAuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserAuth) private userAuth: Repository<UserAuth>,
    private auth: ApiAuthService,
  ) {
    // this.registerWithEmailPassword({
    //   user: {
    //     name: 'Andreas Ipsen',
    //   },
    //   auth: {
    //     email: 'andr940f@gmail.com',
    //     password: '123',
    //   },
    // });
  }

  private async findUserAuthByEmail(email: string): Promise<UserAuth | null> {
    const found = await this.userAuth.findOneBy({ email });
    return found;
  }

  public async registerWithEmailPassword(dto: RegisterWithEmailPasswordDto) {
    const { user: _user, auth: _auth } = dto;

    // check if email is in use
    const found = await this.findUserAuthByEmail(_auth.email);

    if (found) {
      throw new ForbiddenException(`Email is already in use.`);
    }

    const user = await this.user.save(_user);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(_auth.password, salt);

    const auth = await this.userAuth.save({ email: _auth.email, salt, hash, user });

    return this.auth.login({ userId: user.id, email: auth.email });
  }

  public async loginWithEmailPassword(dto: LoginWithEmailPasswordDto) {
    const { email, password } = dto;
    const userAuth = await this.userAuth.findOne({ where: { email }, relations: ['user'] });

    if (!userAuth) {
      throw new NotFoundException(`User/Password combination wrong`);
    }

    const hash = await bcrypt.hash(password, userAuth.salt);

    if (hash !== userAuth.hash) {
      throw new ForbiddenException(`User/Password combination wrong`);
    }

    return this.auth.login({ userId: userAuth.user.id, email });
  }
}
