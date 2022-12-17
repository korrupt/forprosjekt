import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiMqttConfigService {
  constructor(private conf: ConfigService) {}

  get PORT(): number {
    return this.conf.get('mqtt.PORT');
  }

  get HOST(): string {
    return this.conf.get('mqtt.HOST');
  }
}
