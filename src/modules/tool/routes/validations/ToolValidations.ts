import Joi from '@hapi/joi';

export const ToolValidationSchema = {
  store: Joi.object().keys({
    titulo: Joi.string().required().min(5),
    descricao: Joi.string().min(30).required(),
    link: Joi.string().required().min(6),
  }),
};
