import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiMqttConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MQTT_PORT: Joi.number().default(1883),
        MQTT_HOST: Joi.string().default('mosquitto'),
      }),
    }),
  ],
  providers: [ConfigService, ApiMqttConfigService],
  exports: [ConfigService, ApiMqttConfigService],
})
export class ApiMqttConfigModule {}
