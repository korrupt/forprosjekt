import { MQTT_CLIENT_ID } from '@forprosjekt/ms-mqtt/core/utils';
import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

// test setup
interface TemperatureSensor {
  name: string;
  temperature: string;
  // errorCodes: Record<string, boolean>;
}

interface BatterySnapshot {
  temps: TemperatureSensor[];
}

function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

class BatterySim {
  temperatures: TemperatureSensor[];
  // stay between 50 and 80
  private emulateSensorNext(sensor: TemperatureSensor) {
    let temperature = parseFloat(sensor.temperature);
    // 50/50 chance to increase or decrease
    if (Math.random() > 0.5) {
      temperature += Math.floor(2 * Math.random());
    } else {
      temperature -= Math.floor(2 * Math.random());
    }

    return { ...sensor, temperature: clamp(temperature, 50, 80).toFixed(2) };
  }

  constructor(numSensors: number) {
    this.temperatures = Array(numSensors)
      .fill(0)
      .map((_, i) => ({ name: `Sensor ${i + 1}`, temperature: '70' }));
  }

  public next() {
    this.temperatures = this.temperatures.map((t) => this.emulateSensorNext(t));
    return this.temperatures;
  }
}

@Injectable()
export class MsMqttBatterySimService implements OnApplicationBootstrap {
  private logger = new Logger(`BatterySim #${this.clientId}`);

  sim = new BatterySim(15);

  constructor(
    @Inject('MQTT_CLIENT') private client: ClientProxy,
    @Inject(MQTT_CLIENT_ID) private clientId: MQTT_CLIENT_ID,
  ) {}

  private createRandomMSDelay(min: number, max: number): number {
    return Math.floor(1000 * (min + (max - min) * Math.random()));
  }

  private interval?: NodeJS.Timer;

  private attachInterval(ms: number) {
    this.interval = setInterval(() => {
      const record = new MqttRecordBuilder().setData({ temps: this.sim.next() }).setQoS(0).build();
      this.client.send(`${this.clientId}/snapshot`, record).subscribe();
    }, ms);
  }

  private start() {
    // wait random amount of time
    setTimeout(() => this.attachInterval(2000), this.createRandomMSDelay(2, 5));
  }

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
      this.logger.log('Connected.');

      this.start();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
