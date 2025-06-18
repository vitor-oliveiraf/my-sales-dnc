import { Router } from "express";
import ProfileController from "../controllers/ProfileControllers";
import { updateUserSchema } from "../schemas/UpdateUserSchemas";
import AuthMiddleware from "../../../shared/middlewares/authMiddleware";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);
profileRouter.put("/", updateUserSchema, profileController.update);
profileRouter.get("/", profileController.show);

export default profileRouter;
