import Joi from 'joi';

export const affectedServiceSchema = Joi.object({
  composeFile: Joi.string().required().label('--compose-file'),
  affectedComposeFile: Joi.string().label('--affected-compose-file'),
  projectName: Joi.string().required().label('--project-name'),
  deploy: Joi.boolean().required(),
  cwd: Joi.string().optional(),
});
