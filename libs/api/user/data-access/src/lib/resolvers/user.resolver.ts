import { ApolloGuard, AuthUser, GQLAuth } from '@forprosjekt/api/auth/utils';
import { User } from '@forprosjekt/api/user/utils';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ApiUserAclAdapter } from '../adapters';

@Resolver()
@UseGuards(ApolloGuard)
export class ApiUserResolver {
  constructor(private user: ApiUserAclAdapter) {}

  @Query(() => [User], { name: 'users' })
  public findUsers(@GQLAuth() auth: AuthUser) {
    return this.user.findUsers(auth);
  }

  @Query(() => User, { name: 'user' })
  public findUser(@GQLAuth() auth: AuthUser, @Args('userId', { type: () => ID }) userId: string) {
    return this.user.findUser(auth, userId, true);
  }

  @Query(() => User, { name: 'me' })
  public findLoggedInUser(@GQLAuth() auth: AuthUser) {
    if (!auth.id) throw new ForbiddenException(`User not logged in.`);
    return this.user.findUser(auth, auth.id, true);
  }
}
