import { DynamicModule, Module } from '@nestjs/common';
import { MQTT_CLIENT_ID } from '@forprosjekt/ms-mqtt/core/utils';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class MsMqttCoreModule {
  static register(id: string): DynamicModule {
    return {
      module: MsMqttCoreModule,
      providers: [
        {
          provide: MQTT_CLIENT_ID,
          useValue: id,
        },
      ],
    };
  }
}
