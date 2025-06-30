import { Router } from "express";
import ForgotPasswordControllers from "../controllers/ForgotPasswordControllers";
import ResetPasswordControllers from "../controllers/ResetPasswordControllers";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/PasswordSquemas";

const passwordRoutes = Router();

const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPasswordControllers();

passwordRoutes.post(
  "/forgot",
  ForgotPasswordSchema,
  forgotPasswordControllers.create
);
passwordRoutes.post(
  "/reset",
  ResetPasswordSchema,
  resetPasswordControllers.create
);

export default passwordRoutes;
