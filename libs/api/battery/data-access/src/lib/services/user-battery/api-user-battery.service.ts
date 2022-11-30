import { Battery, CreateUserBatteryDto, UpdateUserBatteryDto, UserBattery } from '@forprosjekt/api/battery/utils';
import { User } from '@forprosjekt/api/user/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiUserBatteryService {
  constructor(
    @InjectRepository(Battery) private battery: Repository<Battery>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserBattery) private userBattery: Repository<UserBattery>,
  ) {}

  private async findUserById(id: string) {
    const found = await this.user.findOneBy({ id });
    if (!found) throw new NotFoundException('User not found.');
    return found;
  }

  private async findBatteryById(id: string) {
    const found = await this.battery.findOneBy({ id });
    if (!found) throw new NotFoundException('Battery not found.');
    return found;
  }

  public async create(body: CreateUserBatteryDto, ownerId: string) {
    const { userId, batteryId } = body;

    //TODO: rydd
    await Promise.all([this.findUserById(userId), this.findBatteryById(batteryId)]);

    return this.userBattery.save({ ...body, ownerId });
  }

  public async find() {
    return this.userBattery.find();
  }

  public async findOne(id: string, throws?: boolean): Promise<UserBattery | undefined>;
  public async findOne(id: string, throws = true): Promise<UserBattery> {
    const found = await this.userBattery.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`UserBattery with id '${id}' not found.`);
    }

    return found;
  }

  public async findFromUserRelation(user: User) {
    return this.userBattery.findBy({ userId: user.id });
  }

  public async findFromBatteryRelation(battery: Battery) {
    return this.userBattery.findBy({ batteryId: battery.id });
  }

  public async update(id: string, body: UpdateUserBatteryDto) {
    const battery = await this.findOne(id, true);
    return this.userBattery.save({ ...battery, ...body });
  }

  public async delete(userBatteryId: string) {
    const userBattery = await this.findOne(userBatteryId, true);
    const { id } = userBattery;
    await this.userBattery.remove(userBattery);
    return { id };
  }
}
