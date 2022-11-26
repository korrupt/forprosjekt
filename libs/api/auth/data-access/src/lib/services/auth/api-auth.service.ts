import { ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { AccessToken } from '@forprosjekt/api/auth/utils';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiAuthService {
  constructor(private conf: ApiAuthConfigService, private jwt: JwtService) {}

  public login(user: { id: string; email: string }): AccessToken {
    return {
      access_token: this.jwt.sign(user, {
        expiresIn: this.conf.EXPIRY,
      }),
    };
  }
}
