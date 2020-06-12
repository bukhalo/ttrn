import { registerAs } from '@nestjs/config';

export interface Repost {
  // chat id for reposting
  chatId: number;
  // array of user ids allowed for reposting
  allowedUserIds: number[];
}

const getChatId = (): number => {
  if (process.env.NODE_ENV !== 'production') {
    return -1001488058944;
  }
  return -1001310578019;
};

export const repost = registerAs(
  'repost',
  (): Repost => ({
    chatId: getChatId(),
    allowedUserIds: [80098287],
  }),
);
