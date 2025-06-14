import { Router } from "express";
import productsRouter from "../../../modules/products/routes/ProductRoutes";
import userRouter from "../../../modules/users/routes/UserRoutes";
import sessionRouter from "../../../modules/users/routes/SessionRoutes";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Server is running");
});

router.use("/products", productsRouter);
router.use("/users", userRouter);
router.use("/sessions", sessionRouter);

export default router;
