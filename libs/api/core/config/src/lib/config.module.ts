// import {  } from "";

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { ApiCoreConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CORE_ENV: Joi.string().valid('development', 'production', 'cli', 'test').default('production'),
      }),
    }),
  ],
  providers: [ConfigService, ApiCoreConfigService],
  exports: [ConfigService, ApiCoreConfigService],
})
export class ApiCoreConfigModule {}
