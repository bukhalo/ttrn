import * as ts from 'typescript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TG_BOT_TOKEN: string;
    }
  }
}
