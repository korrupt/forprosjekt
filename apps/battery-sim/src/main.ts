import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MsMqttCoreModule } from '@forprosjekt/ms-mqtt/core/feature';

const clientId = '123';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MsMqttCoreModule.register(clientId), {
    // transport: Transport.MQTT,
  });

  await app.listen();
}

bootstrap();
