import { ApolloGuard, AuthUser, GQLAuth } from '@forprosjekt/api/auth/utils';
import { Battery, CreateUserBatteryDto, UserBattery } from '@forprosjekt/api/battery/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ApiBatteryAclAdapter, ApiUserBatteryAclAdapter } from '../adapters';

@Resolver(() => UserBattery)
@UseGuards(ApolloGuard)
export class ApiUserBatteryResolver {
  constructor(private userBattery: ApiUserBatteryAclAdapter, private battery: ApiBatteryAclAdapter) {}

  @ResolveField(() => Battery, { name: 'battery' })
  public async findBattery(@GQLAuth() auth: AuthUser, @Parent() parent: UserBattery) {
    return this.battery.findOneBattery(auth, parent.batteryId);
  }

  @Mutation(() => UserBattery)
  public async createUserBattery(@GQLAuth() auth: AuthUser, @Args('body') body: CreateUserBatteryDto) {
    return this.userBattery.createUserBattery(auth, body);
  }
}
