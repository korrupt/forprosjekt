import {
  Battery,
  BatterySnapshot,
  CreateBatteryDto,
  CreateBatterySnapshotDto,
  UpdateBatteryDto,
  UserBattery,
} from '@forprosjekt/api/battery/utils';
import { User } from '@forprosjekt/api/user/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiBatteryService {
  constructor(
    @InjectRepository(Battery) private battery: Repository<Battery>,
    @InjectRepository(BatterySnapshot) private batterySnapshot: Repository<BatterySnapshot>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserBattery) private userBattery: Repository<UserBattery>,
  ) {}

  public async createSnapshot(body: CreateBatterySnapshotDto) {
    const { id, data } = body;

    // check if battery with id exists
    const battery = await this.findOne(id, false);
    if (!battery) {
      console.error(`Tried to save snapshot to unkown battery.`);
      return;
    }

    await this.batterySnapshot.save({ data, batteryId: id });
  }

  public async create(body: CreateBatteryDto, ownerId: string) {
    return this.battery.save({ ...body, ownerId });
  }

  public async find() {
    return this.battery.find();
  }

  public async findOne(id: string, throws?: boolean): Promise<Battery | undefined>;
  public async findOne(id: string, throws = true) {
    const found: Battery = await this.battery.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`Battery with id '${id}' not found.`);
    }

    return found;
  }

  public async update(id: string, body: UpdateBatteryDto) {
    const battery = await this.findOne(id);
    return this.battery.save({ ...battery, ...body });
  }

  public async delete(batteryId: string) {
    const battery = await this.findOne(batteryId);
    const { id } = battery;
    await this.battery.remove(battery);
    return { id };
  }
}
