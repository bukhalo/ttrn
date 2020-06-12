import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { app, telegrafModule } from './core/configs';
import { PeopleMemesModule } from './people-memes/people-memes.module';
import { RepostModule } from './repost/repost.module';
import { AlarmModule } from './alarm/alarm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, telegrafModule],
      isGlobal: true,
      expandVariables: true,
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('telegrafModule'),
      inject: [ConfigService],
    }),
    PeopleMemesModule,
    RepostModule,
    AlarmModule,
  ],
})
export class AppModule {}
