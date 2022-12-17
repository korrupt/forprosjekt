import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MsMqttCoreModule } from '@forprosjekt/ms-mqtt/core/feature';
import { INestMicroservice } from '@nestjs/common';
import { getPorts } from 'portfinder';

const clientIds = ['battery1'];
// const clientIds = ['battery1', 'battery2', 'battery3'];

const getAvaliablePorts: (num: number) => Promise<number[]> = (num: number) =>
  new Promise((res, rej) => {
    getPorts(num, {}, (err, ports) => {
      if (err) {
        rej(err);
      }
      res(ports);
    });
  });

function listenServices(services: INestMicroservice[]) {
  return Promise.all(services.map((s) => s.listen()));
}

async function bootstrap() {
  const services: INestMicroservice[] = [];
  const ports = await getAvaliablePorts(clientIds.length);

  for (const id of clientIds) {
    const port = ports.pop();
    const ms = await NestFactory.createMicroservice<MicroserviceOptions>(MsMqttCoreModule.register(id), {
      options: {
        port,
      },
    });

    // ms
    services.push(ms);
  }

  await listenServices(services);
}

bootstrap();
