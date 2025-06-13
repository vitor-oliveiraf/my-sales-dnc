import { celebrate, Joi, Segments } from "celebrate";

export const createUserSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(3).messages({
      "string.empty": "O nome não pode estar vazio",
      "string.min": "O nome deve ter pelo menos 3 caracteres",
      "any.required": "O nome é obrigatório",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "string.empty": "O email não pode estar vazio",
      "any.required": "O email é obrigatório",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "A senha não pode estar vazia",
      "string.min": "A senha deve ter pelo menos 6 caracteres",
      "any.required": "A senha é obrigatória",
    }),
    avatar: Joi.string().optional(),
  }),
});
