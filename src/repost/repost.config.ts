import { registerAs } from '@nestjs/config';

export interface Repost {
  // chat id for reposting
  chatId: number;
  // array of user ids allowed for reposting
  allowedUserIds: number[];
}

const getChatId = (): number => {
  if (process.env.NODE_ENV === 'production') {
    // Apple Talks
    return -1001310578019;
  }
  // TTRN Group [TEST]
  return -413294688;
};

export const repost = registerAs(
  'repost',
  (): Repost => ({
    chatId: getChatId(),
    allowedUserIds: [80098287],
  }),
);
