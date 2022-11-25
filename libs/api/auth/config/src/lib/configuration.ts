import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  SECRET: process.env.AUTH_SECRET,
  EXPIRY: process.env.AUTH_EXPIRY,
}))
