import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "../schemas/SessionSchema";

const sessionRouter = Router();
const sessionsController = new SessionsControllers();

sessionRouter.post("/", sessionSchema, sessionsController.create);

export default sessionRouter;
