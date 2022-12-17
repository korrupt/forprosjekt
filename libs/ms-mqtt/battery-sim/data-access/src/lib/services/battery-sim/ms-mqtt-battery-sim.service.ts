import { MQTT_CLIENT_ID } from '@forprosjekt/ms-mqtt/core/utils';
import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class MsMqttBatterySimService implements OnApplicationBootstrap {
  private logger = new Logger(`BatterySim #${this.clientId}`);

  constructor(
    @Inject('MQTT_CLIENT') private client: ClientProxy,
    @Inject(MQTT_CLIENT_ID) private clientId: MQTT_CLIENT_ID,
  ) {}

  private createRandomMSDelay(): number {
    return Math.floor(1000 * (5 + 10 * Math.random()));
  }

  private interval?: NodeJS.Timer;

  private attachInterval(ms: number) {
    this.interval = setInterval(() => {
      const record = new MqttRecordBuilder().setData('data').setQoS(0).build();
      this.client.send(`${this.clientId}/snapshot`, record).subscribe();
    }, ms);
  }

  private startPublishInterval() {
    this.attachInterval(2000);
    // this.attachInterval(this.createRandomMSDelay());
    // setTimeout(() => this.attachInterval(), this.createRandomDelay());
  }

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
      this.logger.log('Connected.');

      this.startPublishInterval();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
