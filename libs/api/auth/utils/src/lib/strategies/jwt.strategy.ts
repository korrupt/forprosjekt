import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { AuthUser } from '../classes';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private conf: ApiAuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.SECRET,
    } as StrategyOptions);
  }

  async validate(auth: AuthUser) {
    return auth;
  }
}
