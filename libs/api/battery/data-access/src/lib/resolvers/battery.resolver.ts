import { ApolloGuard, AuthUser, GQLAuth } from '@forprosjekt/api/auth/utils';
import { Battery, CreateBatteryDto, UpdateBatteryDto } from '@forprosjekt/api/battery/utils';
import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBatteryAclAdapter } from '../adapters';

@Resolver()
@UseGuards(ApolloGuard)
export class ApiBatteryResolver {
  constructor(private battery: ApiBatteryAclAdapter) {}

  @Query(() => [Battery], { name: 'batteries' })
  public async findBatteries(@GQLAuth() auth: AuthUser) {
    return this.battery.findBattery(auth);
  }

  @Query(() => Battery, { name: 'battery' })
  public async findOneBattery(@GQLAuth() auth: AuthUser, @Args('batteryId', { type: () => ID }) batteryId: string) {
    return this.battery.findOneBattery(auth, batteryId);
  }

  @Mutation(() => Battery)
  public async createBattery(@GQLAuth() auth: AuthUser, @Args('body') body: CreateBatteryDto) {
    return this.battery.createBattery(auth, body);
  }

  @Mutation(() => Battery)
  public async updateBattery(
    @GQLAuth() auth: AuthUser,
    @Args('batteryId', { type: () => ID }) batteryId: string,
    @Args('body') body: UpdateBatteryDto,
  ) {
    return this.battery.updateBattery(auth, batteryId, body);
  }
}
