import Joi from 'joi';

export const prepareArgumentSchema = Joi.object({
  includePattern: Joi.array().items(Joi.string()).label('--include-pattern'),
  excludePattern: Joi.array().items(Joi.string()).label('--exclude-pattern'),
  exclude: Joi.boolean().label('--exclude'),
  include: Joi.boolean().label('--include'),
  github: Joi.boolean(),
  affected: Joi.boolean(),
});
