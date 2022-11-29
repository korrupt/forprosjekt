import { ApolloGuard, AuthUser, GQLAuth } from '@forprosjekt/api/auth/utils';
import { User } from '@forprosjekt/api/user/utils';
import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ApiUserService } from '../services';

@Resolver()
@UseGuards(ApolloGuard)
export class UserResolver {
  constructor(private user: ApiUserService) {}

  @Query(() => [User], { name: 'user' })
  public findUsers(@GQLAuth() auth: AuthUser) {
    return this.user.findUsers();
  }

  @Query(() => User, { name: 'user' })
  public findUser(@GQLAuth() auth: AuthUser, @Args('userId', { type: () => ID }) userId: string) {
    return this.user.findUser(userId, true);
  }
}
