import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  /** App configuration */
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),

  /** Telegram bot configuration */
  BOT_TOKEN: Joi.string().required(),
  BOT_GROUP_ID: Joi.number(),

  /** Redis configuration */
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_PASSWORD: Joi.string(),
});
