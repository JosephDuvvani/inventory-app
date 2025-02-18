import { Router } from "express";
import {
  allProductsGet,
  categoryProductsGet,
} from "../controllers/invControllers.js";

const categoryRouter = Router();

categoryRouter.get("/:id/categories", categoryProductsGet);
categoryRouter.get("/products", allProductsGet);

export { categoryRouter };
