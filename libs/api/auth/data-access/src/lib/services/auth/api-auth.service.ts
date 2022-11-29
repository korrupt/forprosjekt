import { ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { AccessToken } from '@forprosjekt/api/auth/utils';
import { AccessRole, JwtPayload } from '@forprosjekt/shared/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiAuthService {
  constructor(private conf: ApiAuthConfigService, private jwt: JwtService) {}

  public login(user: JwtPayload): AccessToken {
    const roles = user.roles.concat(AccessRole.USER);
    const _user = { ...user, roles };

    return {
      access_token: this.jwt.sign(_user, {
        expiresIn: this.conf.EXPIRY,
      }),
    };
  }
}
