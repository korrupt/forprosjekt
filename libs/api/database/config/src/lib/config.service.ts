import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiDatabaseConfigService {
  constructor(private conf: ConfigService) {}

  get HOST(): string {
    return this.conf.get('database.HOST');
  }

  get PORT(): number {
    return this.conf.get('database.PORT');
  }

  get USER(): string {
    return this.conf.get('database.USER');
  }

  get PASS(): string {
    return this.conf.get('database.PASSWORD');
  }

  get DB(): string {
    return this.conf.get('database.DB');
  }

  get URI() {
    return `mongodb://${this.USER}:${this.PASS}@${this.HOST}:${this.PORT}/?authMechanism=DEFAULT&authSource=${this.DB}`;
  }
}
