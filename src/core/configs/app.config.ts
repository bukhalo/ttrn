import { registerAs } from '@nestjs/config';

const isProduction = process.env.NODE_ENV === 'production';

const getBotGroupId = (): number => {
  if (isProduction) {
    return -1001310578019; // Apple Talks
  }
  return -1001463143458; // TTRN Group [TEST]
};

export interface AppConfig {
  port: number;
  isProduction: boolean;
  botGroupId: number;
}

export const app = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT) || 3000,
    isProduction,
    botGroupId: parseInt(process.env.BOT_GROUP_ID) || getBotGroupId(),
  }),
);
