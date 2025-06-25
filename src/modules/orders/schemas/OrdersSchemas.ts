import { celebrate, Joi, Segments } from "celebrate";

export const createOrderSchema = celebrate({
  [Segments.BODY]: {
    customer_id: Joi.string().required().messages({
      "string.empty": "Customer ID is required",
    }),
    products: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required().messages({
            "number.empty": "Product ID is required",
          }),
          quantity: Joi.number().integer().required().messages({
            "number.integer": "Quantity must be an integer",
            "number.empty": "Quantity is required",
          }),
        })
      )
      .required(),
  },
});

export const idParamSchema = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required().messages({
      "number.base": "Id must be a number",
      "number.empty": "Id is required",
      "number.integer": "Id must be an integer",
      "number.positive": "Id must be a positive number",
    }),
  },
});
