import { registerAs } from '@nestjs/config';

export interface Repost {
  // array of user ids allowed for reposting
  allowedUserIds: number[];
}

export const repost = registerAs(
  'repost',
  (): Repost => ({
    allowedUserIds: [80098287],
  }),
);
