import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiCoreConfigService {
  constructor(private conf: ConfigService) {}

  get ENV(): 'development' | 'production' | 'cli' | 'test' {
    return this.conf.get('core.ENV');
  }
}
