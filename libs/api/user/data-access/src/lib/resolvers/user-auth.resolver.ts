import { AccessToken, ApolloGuard } from '@forprosjekt/api/auth/utils';
import { LoginWithEmailPasswordDto, RegisterWithEmailPasswordDto } from '@forprosjekt/api/user/utils';
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ApiUserAuthService } from '../services';

@Resolver()
@UseGuards(ApolloGuard)
export class UserAuthResolver {
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
