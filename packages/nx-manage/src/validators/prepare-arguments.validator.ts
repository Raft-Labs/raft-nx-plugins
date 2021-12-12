import Joi from 'joi';

export const prepareArgumentSchema = Joi.object({
  includePattern: Joi.string().label('--include-pattern'),
  excludePattern: Joi.string().label('--exclude-pattern'),
  exclude: Joi.string().label('--exclude'),
  include: Joi.string().label('--include'),
  github: Joi.boolean(),
  affected: Joi.boolean(),
});
