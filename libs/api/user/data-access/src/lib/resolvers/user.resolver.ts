import { ApolloGuard, AuthUser, GQLAuth } from '@forprosjekt/api/auth/utils';
import { ApiUserBatteryAclAdapter } from '@forprosjekt/api/battery/data-access';
import { UserBattery } from '@forprosjekt/api/battery/utils';
import { UpdateUserDto, User } from '@forprosjekt/api/user/utils';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApiUserAclAdapter } from '../adapters';

@Resolver(() => User)
@UseGuards(ApolloGuard)
export class ApiUserResolver {
  constructor(private user: ApiUserAclAdapter, private userBattery: ApiUserBatteryAclAdapter) {}

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

  @Mutation(() => User)
  public updateUser(
    @GQLAuth() auth: AuthUser,
    @Args('userId', { type: () => ID }) userId: string,
    @Args('body') body: UpdateUserDto,
  ) {
    return this.user.updateUser(auth, userId, body);
  }

  @ResolveField(() => [UserBattery], { name: 'batteries' })
  public getUserBatteriesFromUserRelation(@GQLAuth() auth: AuthUser, @Parent() parent: User) {
    return this.userBattery.findFromUserRelation(auth, parent);
  }
}
