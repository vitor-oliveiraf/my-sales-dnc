import { celebrate, Joi, Segments } from "celebrate";

export const ForgotPasswordSchema = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  },
});

export const ResetPasswordSchema = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required().messages({
      "string.uuid": "Token must be a valid UUID",
      "string.empty": "Token is required",
      "any.required": "Token is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
    password_confirmation: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Password confirmation does not match",
        "string.empty": "Password confirmation is required",
        "any.required": "Password confirmation is required",
      }),
  },
});
