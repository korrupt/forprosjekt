import { AccessToken } from '@forprosjekt/api/auth/utils';
import { LoginWithEmailPasswordDto } from '@forprosjekt/api/user/utils';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ApiUserAuthService } from '../services';

@Resolver()
export class UserAuthResolver {
  constructor(private userAuth: ApiUserAuthService) {}

  @Mutation(() => AccessToken)
  public async loginWithEmailPassword(@Args('body') dto: LoginWithEmailPasswordDto) {
    return this.userAuth.loginWithEmailPassword(dto);
  }
}
