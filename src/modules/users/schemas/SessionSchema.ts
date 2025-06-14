import { celebrate, Joi, Segments } from "celebrate";

export const sessionSchema = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required().messages({
      "string.email": "Email ou senha incorretos",
      "string.empty": "Email ou senha incorretos",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Email ou senha incorretos",
    }),
  },
});
