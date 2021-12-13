import Joi from 'joi';

export const environmentSchema = Joi.object({
  NX_BASE: Joi.string().required().label('NX_BASE'),
  NX_HEAD: Joi.string().required().label('NX_HEAD'),
});
