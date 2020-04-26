import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';

export const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Get services from context
  const configService = app.get('ConfigService');
  const telegrafProvider = app.get('TelegrafProvider');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Set Telegraf webhook
  app.use(telegrafProvider.webhookCallback('/webhook'));

  await app.init();
}
bootstrap();
