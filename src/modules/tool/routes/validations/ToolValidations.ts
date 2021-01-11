import Joi from '@hapi/joi';

export const ToolValidationSchema = {
  store: Joi.object().keys({
    title: Joi.string().required().min(5),
    description: Joi.string().min(30).required(),
    url: Joi.string().required().min(6),
    tags: Joi.array().items(Joi.string()),
  }),
  destroy: Joi.object().keys({
    id: Joi.number().min(1).required(),
  }),
};
