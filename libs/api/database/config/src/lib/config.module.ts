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
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_SYNC: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, ApiDatabaseConfigService],
  exports: [ConfigService, ApiDatabaseConfigService],
})
export class ApiDatabaseConfigModule {}
