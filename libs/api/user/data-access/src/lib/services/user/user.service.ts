import { User } from '@forprosjekt/api/user/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiUserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  public findUsers(): Promise<User[]> {
    return this.user.find();
  }

  public async findUser(id: string, throws: false): Promise<User | undefined>;
  public async findUser(id: string, throws = true): Promise<User> {
    const found = await this.user.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return found;
  }
}
