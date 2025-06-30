import express, { Router } from "express";
import productsRouter from "../../../../modules/products/infra/http/routes/ProductRoutes";
import userRouter from "../../../../modules/users/infra/http/routes/UserRoutes";
import sessionRouter from "../../../../modules/users/infra/http/routes/SessionRoutes";
import avatarRouter from "../../../../modules/users/infra/http/routes/AvatarRoutes";
import uploadConfig from "../../../../config/upload";
import passwordRouter from "../../../../modules/users/infra/http/routes/PasswordRoutes";
import profileRouter from "../../../../modules/users/infra/http/routes/ProfileRoutes";
import customersRouter from "../../../../modules/customers/infra/http/routes/CustomerRoutes";
import ordersRouter from "../../../../modules/orders/infra/http/routes/OrdersRoutes";
const routes = Router();

routes.get("/health", (req, res) => {
  res.send("Server is running");
});

routes.use("/products", productsRouter);
routes.use("/users", userRouter);
routes.use("/sessions", sessionRouter);
routes.use("/avatar", avatarRouter);
routes.use("/passwords", passwordRouter);
routes.use("/profiles", profileRouter);
routes.use("/customers", customersRouter);
routes.use("/orders", ordersRouter);
routes.use("/files", express.static(uploadConfig.directory));

export default routes;
