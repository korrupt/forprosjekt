import { registerAs } from "@nestjs/config";

export default registerAs('database', () => {
  return {
    PORT: parseInt(process.env.DATABASE_PORT),
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASS,
    DB: process.env.DATABASE_DB
  }
});
