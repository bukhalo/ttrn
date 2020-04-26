import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: ((process.env.PORT as unknown) as number) || 3000,
}));
