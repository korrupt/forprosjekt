import { MsMqttBatterySimConfigModule, MsMqttBatterySimConfigService } from '@forprosjekt/ms-mqtt/battery-sim/config';
import { MsMqttBatterySimService } from '@forprosjekt/ms-mqtt/battery-sim/data-access';
import { MQTT_CLIENT_ID } from '@forprosjekt/ms-mqtt/core/utils';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [MsMqttBatterySimConfigModule],
        inject: [MQTT_CLIENT_ID, MsMqttBatterySimConfigService],
        useFactory: (clientId: MQTT_CLIENT_ID, conf: MsMqttBatterySimConfigService) => ({
          transport: Transport.MQTT,
          options: {
            port: conf.PORT,
            host: conf.HOST,
            clientId,
          },
        }),
      },
    ]),
  ],
  providers: [MsMqttBatterySimService],
  exports: [],
})
export class MsMqttBatterySimModule {}
