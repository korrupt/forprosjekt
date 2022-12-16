import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MsMqttBatterySimConfigService } from './config.service';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MQTT_HOST: Joi.string().default('mosquitto'),
        MQTT_PORT: Joi.number().default(1883),
      }),
    }),
  ],
  providers: [ConfigService, MsMqttBatterySimConfigService],
  exports: [ConfigService, MsMqttBatterySimConfigService],
})
export class MsMqttBatterySimConfigModule {}
