import { Router } from "express";
import OrdersController from "../controller/OrdersControllers";
import { createOrderSchema, idParamSchema } from "../schemas/OrdersSchemas";
import AuthMiddleware from "../../../shared/middlewares/authMiddleware";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(AuthMiddleware.execute);
ordersRouter.get("/:id", idParamSchema, ordersController.show);
ordersRouter.post("/", createOrderSchema, ordersController.create);

export default ordersRouter;
