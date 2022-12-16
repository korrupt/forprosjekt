import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MsMqttBatterySimConfigService {
  constructor(private conf: ConfigService) {}

  get PORT(): number {
    return this.conf.get('core.PORT');
  }

  get HOST(): string {
    return this.conf.get('core.HOST');
  }
}
