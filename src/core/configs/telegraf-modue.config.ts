import { registerAs } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

function launchOptions() {
  if (process.env.NODE_ENV === 'production') {
    return {
      webhook: {
        domain: 'europe-west3-civic-brand-280108.cloudfunctions.net',
        hookPath: '/totaren-bot-europe-west-3-production/webhook',
      },
    };
  }
  return {};
}

export const telegrafModule = registerAs(
  'telegrafModule',
  (): TelegrafModuleOptions => ({
    token: process.env.BOT_TOKEN as string,
    launchOptions: launchOptions(),
  }),
);
