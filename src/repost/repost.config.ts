import { registerAs } from '@nestjs/config';

export interface Repost {
  // chat id for reposting
  chatId: number;
  // array of user ids allowed for reposting
  allowedUserIds: number[];
}

export const repost = registerAs(
  'repost',
  (): Repost => ({
    chatId: -1001310578019,
    allowedUserIds: [80098287],
  }),
);
