import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const userRouter = Router();
const usersController = new UsersControllers();

userRouter.post("/", createUserSchema, usersController.create);
userRouter.get("/", usersController.list);

export default userRouter;
