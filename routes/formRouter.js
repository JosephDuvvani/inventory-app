import { Router } from "express";
import {
  newProductGet,
  newProductPost,
} from "../controllers/invControllers.js";

const newProductRouter = Router();

newProductRouter.get("/product", newProductGet);
newProductRouter.post("/product", newProductPost);

export { newProductRouter };
