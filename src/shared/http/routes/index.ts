import express, { Router } from "express";
import productsRouter from "../../../modules/products/routes/ProductRoutes";
import userRouter from "../../../modules/users/routes/UserRoutes";
import sessionRouter from "../../../modules/users/routes/SessionRoutes";
import avatarRouter from "../../../modules/users/routes/AvatarRoutes";
import uploadConfig from "../../../config/upload";
import passwordRouter from "../../../modules/users/routes/PasswordRoutes";
import profileRouter from "../../../modules/users/routes/ProfileRoutes";
import customersRouter from "../../../modules/customers/routes/CustomerRoutes";

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
routes.use("/files", express.static(uploadConfig.directory));

export default routes;
