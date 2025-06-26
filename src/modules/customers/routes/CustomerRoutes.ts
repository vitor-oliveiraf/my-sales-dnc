import { Router } from "express";
import CustomersControllers from "../controllers/Customers.Controllers";
import AuthMiddleware from "../../../shared/middlewares/authMiddleware";
import {
  createCustomerSchema,
  idParamsValidate,
  updateCustomerSchema,
} from "../schemas/CustomerSchema";

const customersRouter = Router();
const customersControllers = new CustomersControllers();

customersRouter.use(AuthMiddleware.execute);
customersRouter.post("/", createCustomerSchema, customersControllers.create);
customersRouter.get("/", customersControllers.index); 
customersRouter.get("/:id", idParamsValidate, customersControllers.show);
customersRouter.patch(
  "/:id",
  idParamsValidate,
  updateCustomerSchema,
  customersControllers.update
);
customersRouter.delete("/:id", idParamsValidate, customersControllers.delete);

export default customersRouter;
