import { celebrate, Joi, Segments } from "celebrate";

export const createProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": "O nome não pode estar vazio",
      "any.required": "O nome é obrigatório",
    }),
    price: Joi.number().positive().strict().precision(2).required().messages({
      "number.base": "O preço deve ser um número",
      "number.positive": "O preço deve ser maior que zero",
      "any.required": "O preço é obrigatório",
      "number.strict": "O preço deve ser um número, não uma string",
    }),
    quantity: Joi.number().integer().positive().strict().required().messages({
      "number.base": "A quantidade deve ser um número",
      "number.integer": "A quantidade deve ser um número inteiro",
      "number.positive": "A quantidade deve ser maior que zero",
      "any.required": "A quantidade é obrigatória",
      "number.strict": "A quantidade deve ser um número, não uma string",
    }),
  }),
});

export const updateProductSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().messages({
      "string.empty": "O ID não pode estar vazio",
      "any.required": "O ID é obrigatório",
    }),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": "O nome não pode estar vazio",
      "any.required": "O nome é obrigatório",
    }),
    price: Joi.number().positive().precision(2).required().messages({
      "number.base": "O preço deve ser um número",
      "number.positive": "O preço deve ser maior que zero",
      "any.required": "O preço é obrigatório",
    }),
    quantity: Joi.number().integer().positive().strict().required().messages({
      "number.base": "A quantidade deve ser um número",
      "number.integer": "A quantidade deve ser um número inteiro",
      "number.positive": "A quantidade deve ser maior que zero",
      "any.required": "A quantidade é obrigatória",
      "number.strict": "A quantidade deve ser um número, não uma string",
    }),
  }),
});

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required().messages({
      "string.empty": "O ID não pode estar vazio",
      "any.required": "O ID é obrigatório",
    }),
  },
});
