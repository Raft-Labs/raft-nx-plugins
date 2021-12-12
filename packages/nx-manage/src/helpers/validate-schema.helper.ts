import Joi from 'joi';

export const validateSchema = async (schema: Joi.Schema, options: any) => {
  return await schema.validateAsync(options, {
    abortEarly: false,
    allowUnknown: false,
  });
};
