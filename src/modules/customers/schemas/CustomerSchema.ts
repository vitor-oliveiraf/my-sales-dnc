import { celebrate, Joi, Segments } from "celebrate";

export const idParamsValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required().messages({
      "number.base": "ID must be a number",
      "number.empty": "ID is required",
      "number.positive": "ID must be a positive number",
      "number.integer": "ID must be an integer",
    }),
  },
});

export const createCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "string.base": "Name must be a string",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.base": "Email must be a string",
    }),
  },
});

export const updateCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().optional().messages({
      "string.empty": "Name is required",
      "string.base": "Name must be a string",
    }),
    email: Joi.string().email().optional().messages({
      "string.empty": "Email is required",
      "string.base": "Email must be a string",
    }),
  },
});
