import { registerAs } from '@nestjs/config';

export default registerAs('core', () => ({
  HOST: process.env.MQTT_HOST,
  PORT: parseInt(process.env.MQTT_PORT),
}));
