import Joi from 'joi';

export const encryptSchema = Joi.object({
  passphrase: Joi.string().required().label('--passphrase'),
  environment: Joi.string().required().label('--environment'),
  cwd: Joi.string().optional().label('--cwd'),
});
