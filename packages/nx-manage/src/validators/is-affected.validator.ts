import Joi from 'joi';

export const IsAffectedSchema = Joi.object({
  service: Joi.boolean().label('--service'),
  composeFile: Joi.string()
    .label('--compose-file')
    .when('service', { is: true, then: Joi.required() }),

  apps: Joi.boolean().label('--apps'),
  pattern: Joi.string()
    .label('--pattern')
    .when('apps', { is: true, then: Joi.required() }),

  github: Joi.boolean().optional().label('--github'),
  json: Joi.boolean().optional().label('--json'),
  cwd: Joi.string().optional().label('--cwd'),
});
