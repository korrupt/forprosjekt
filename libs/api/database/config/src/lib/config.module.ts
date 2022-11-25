import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { ApiDatabaseConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(27017),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, ApiDatabaseConfigService],
  exports: [ConfigService, ApiDatabaseConfigService],
})
export class ApiDatabaseConfigModule {}
