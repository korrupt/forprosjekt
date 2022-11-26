import { User } from '@forprosjekt/api/user/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiUserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  public findUsers(): Promise<User[]> {
    return this.user.find();
  }
}
