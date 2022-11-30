import { Battery, UserBattery } from '@forprosjekt/api/battery/utils';
import { User } from '@forprosjekt/api/user/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiUserBatteryService {
  constructor(
    @InjectRepository(Battery) private battery: Repository<Battery>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserBattery) private userBattery: Repository<UserBattery>,
  ) {}

  // public async create()
}
