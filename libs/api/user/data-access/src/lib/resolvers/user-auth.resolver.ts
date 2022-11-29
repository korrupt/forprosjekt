import { AccessToken } from '@forprosjekt/api/auth/utils';
import { LoginWithEmailPasswordDto, RegisterWithEmailPasswordDto } from '@forprosjekt/api/user/utils';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ApiUserAuthService } from '../services';

@Resolver()
export class ApiUserAuthResolver {
  constructor(private userAuth: ApiUserAuthService) {}

  @Mutation(() => AccessToken)
  public async loginWithEmailPassword(@Args('body') dto: LoginWithEmailPasswordDto) {
    return this.userAuth.loginWithEmailPassword(dto);
  }

  @Mutation(() => AccessToken)
  public async registerWithEmailPassword(@Args('body') dto: RegisterWithEmailPasswordDto) {
    return this.userAuth.registerWithEmailPassword(dto);
  }
}
