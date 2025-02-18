import { Router } from "express";
import {
  allCategoriesGet,
  allProductsGet,
  categoryProductsGet,
  newCategoryPost,
} from "../controllers/invControllers.js";

const categoryRouter = Router();

categoryRouter.get("/:id/categories", categoryProductsGet);
categoryRouter.get("/products", allProductsGet);
categoryRouter.get("/categories", allCategoriesGet);
categoryRouter.post("/categories", newCategoryPost);

export { categoryRouter };
