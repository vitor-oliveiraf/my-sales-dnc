import { Router } from "express";
import productsRouter from "../../../modules/products/routes/ProductRoutes";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Server is running");
});

router.use("/products", productsRouter);

export default router;
