import { Router } from "express";
import UpdateUserAvatarController from "../controllers/UpdateUserAvatarController";
import multer from "multer";
import uploadConfig from "../../../../../config/upload";
import AuthMiddleware from "../../../../../shared/middlewares/authMiddleware";

const avatarRouter = Router();
const updateUserAvatarController = new UpdateUserAvatarController();
const upload = multer(uploadConfig);

avatarRouter.patch(
  "/",
  AuthMiddleware.execute,
  upload.single("avatar"),
  updateUserAvatarController.update
);

export default avatarRouter;
