import { LoginWithEmailPasswordDto, User, UserAuth } from '@forprosjekt/api/user/utils';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ApiUserAuthService } from '../services';

@Resolver()
export class UserAuthResolver {
  constructor(private userAuth: ApiUserAuthService) {}

  @Mutation(() => String)
  public async loginWithEmailPassword(@Args('body') dto: LoginWithEmailPasswordDto) {
    return this.userAuth.loginWithEmailPassword(dto);
  }
}
