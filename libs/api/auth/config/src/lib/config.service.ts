import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiAuthConfigService {
  constructor(private conf: ConfigService){}

  get SECRET(): string {
    return this.conf.get('auth.SECRET');
  }

  get EXPIRY(): string {
    return this.conf.get('auth.EXPIRY');
  }
}
