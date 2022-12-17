import { registerAs } from '@nestjs/config';

export default registerAs('mqtt', () => ({
  PORT: parseInt(process.env.MQTT_PORT),
  HOST: process.env.MQTT_HOST,
}));
