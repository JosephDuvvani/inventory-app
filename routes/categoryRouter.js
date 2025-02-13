import { Router } from "express";
import { categoryProductsGet } from "../controllers/invControllers.js";

const categoryRouter = Router();

categoryRouter.get("/:id/categories", categoryProductsGet);

export { categoryRouter };
