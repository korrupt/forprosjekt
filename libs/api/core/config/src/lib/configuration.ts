import { registerAs } from '@nestjs/config';

export default registerAs('core', () => ({
  ENV: process.env.CORE_ENV,
}));
