import { object, string, number, ValidationOptions } from '@hapi/joi';

export const validationSchema = object({
  NODE_ENV: string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  BOT_TOKEN: string().required(),
});

export const validationOptions: ValidationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
