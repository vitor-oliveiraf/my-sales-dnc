import { celebrate, Segments, Joi } from "celebrate";

export const updateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).optional().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().optional().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
    password_confirmation: Joi.string()
      .valid(Joi.ref("password"))
      .when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      })
      .messages({
        "any.only": "Password confirmation does not match",
        "string.empty": "Password confirmation is required",
        "any.required": "Password confirmation is required",
      }),
  },
});
