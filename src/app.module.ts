import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import {
  app,
  redis,
  validationOptions,
  validationSchema,
} from './core/configs';
import { PeopleMemesModule } from './people-memes/people-memes.module';
import { RepostModule } from './repost/repost.module';
import { AlarmModule } from './alarm/alarm.module';
import { CockCheckModule } from './cock-check/cock-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, redis],
      isGlobal: true,
      expandVariables: true,
      validationSchema,
      validationOptions,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get('BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    PeopleMemesModule,
    RepostModule,
    AlarmModule,
    CockCheckModule,
  ],
})
export class AppModule {}
