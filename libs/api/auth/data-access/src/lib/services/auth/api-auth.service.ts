import { ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { AccessToken } from '@forprosjekt/api/auth/utils';
import { JwtPayload } from '@forprosjekt/shared/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiAuthService {
  constructor(private conf: ApiAuthConfigService, private jwt: JwtService) {}

  public login(user: JwtPayload): AccessToken {
    return {
      access_token: this.jwt.sign(user, {
        expiresIn: this.conf.EXPIRY,
      }),
    };
  }
}
