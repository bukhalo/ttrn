import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export const redis = registerAs(
  'redis',
  (): RedisOptions => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASS,
  }),
);
