import { Router } from "express";
import {
  deleteProductPost,
  editProductPost,
  newProductGet,
  newProductPost,
} from "../controllers/invControllers.js";

const newProductRouter = Router();
const editProductRouter = Router();
const deleteProductRouter = Router();

newProductRouter.get("/product", newProductGet);
newProductRouter.post("/product", newProductPost);
editProductRouter.post("/product/edit/:id", editProductPost);
deleteProductRouter.post("/product/delete/:id", deleteProductPost);

export { newProductRouter, editProductRouter, deleteProductRouter };
