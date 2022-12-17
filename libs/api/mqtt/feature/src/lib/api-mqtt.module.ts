import { ApiMqttConfigModule, ApiMqttConfigService } from '@forprosjekt/api/mqtt/config';
import { ApiMqttService } from '@forprosjekt/api/mqtt/data-access';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [ApiMqttConfigModule],
        inject: [ApiMqttConfigService],
        useFactory: (conf: ApiMqttConfigService) => ({
          transport: Transport.MQTT,
          options: {
            host: conf.HOST,
            port: conf.PORT,
          },
        }),
      },
    ]),
  ],
  providers: [ApiMqttService],
  exports: [ApiMqttService, ClientsModule],
})
export class ApiMqttModule {}
