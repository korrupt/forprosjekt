import { LoginWithEmailPasswordDto, RegisterWithEmailPasswordDto, User, UserAuth } from '@forprosjekt/api/user/utils';
import { ForbiddenException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { ApiAuthService } from '@forprosjekt/api/auth/data-access';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class ApiUserAuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserAuth) private userAuth: Repository<UserAuth>,
    private auth: ApiAuthService,
    private em: EntityManager,
  ) {}

  private async findUserAuthByEmail(email: string): Promise<UserAuth | undefined> {
    return this.userAuth.findOneBy({ email });
  }

  public async registerWithEmailPassword(dto: RegisterWithEmailPasswordDto) {
    const { user: _user, auth: _auth } = dto;

    // check if email is in use
    const found = await this.findUserAuthByEmail(_auth.email);

    if (found) {
      throw new ForbiddenException(`Email is already in use.`);
    }

    // run in transaction
    return this.em.transaction(async (em) => {
      const user = await em.save(User, _user);

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(_auth.password, salt);

      const auth = await em.save(UserAuth, { email: _auth.email, salt, hash, user });

      return this.auth.login({ id: user.id, email: auth.email, roles: user.roles });
    });
  }

  public async loginWithEmailPassword(dto: LoginWithEmailPasswordDto) {
    const { email, password } = dto;
    const userAuth = await this.userAuth.findOne({ where: { email }, relations: ['user'] });

    if (!userAuth) {
      throw new ForbiddenException(`User/Password combination wrong`);
    }

    const hash = await bcrypt.hash(password, userAuth.salt);

    if (hash !== userAuth.hash) {
      throw new ForbiddenException(`User/Password combination wrong`);
    }

    return this.auth.login({ id: userAuth.user.id, email, roles: userAuth.user.roles });
  }
}
