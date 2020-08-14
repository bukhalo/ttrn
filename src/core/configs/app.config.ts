import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: parseInt(process.env.PORT) || 3000,
}));
