import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiDatabaseConfigService {
  constructor(private conf: ConfigService) {}

  get URI() {
    return `mongodb://${this.conf.get('database.USER')}:${this.conf.get('database.PASSWORD')}@${this.conf.get(
      'database.HOST',
    )}:${this.conf.get('database.PORT')}/?authMechanism=DEFAULT&authSource=${this.conf.get('database.DB')}`;
  }
}
