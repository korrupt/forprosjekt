import { DynamicModule, Global, Module } from '@nestjs/common';
import { MQTT_CLIENT_ID } from '@forprosjekt/ms-mqtt/core/utils';
import { MsMqttBatterySimModule } from '@forprosjekt/ms-mqtt/battery-sim/feature';

@Module({})
@Global()
export class MsMqttCoreModule {
  static register(clientId: string): DynamicModule {
    return {
      module: MsMqttCoreModule,
      providers: [
        {
          provide: MQTT_CLIENT_ID,
          useValue: clientId,
        },
      ],
      imports: [MsMqttBatterySimModule],
      exports: [MQTT_CLIENT_ID],
    };
  }
}
