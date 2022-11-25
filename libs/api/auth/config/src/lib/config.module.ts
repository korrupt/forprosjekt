import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { ApiAuthConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        AUTH_SECRET: Joi.string().required(),
        AUTH_EXPIRY: Joi.string().default('2h'),
      })
    })
  ],
  providers: [ConfigService, ApiAuthConfigService],
  exports: [ConfigService, ApiAuthConfigService],
})
export class ApiAuthConfigModule {}
