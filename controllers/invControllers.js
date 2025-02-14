import { format } from "date-fns";
import {
  getAllCategories,
  getCategoryName,
  getCategoryProducts,
} from "../db/queries.js";

const productCategoriesGet = async (req, res) => {
  const categories = await getAllCategories();
  res.render("index", {
    title: "All Categories",
    categories,
  });
};

const categoryProductsGet = async (req, res) => {
  const { id } = req.params;
  const [{ name }] = await getCategoryName(id);
  const productList = await getCategoryProducts(id);
  const products = productList.map((product) => ({
    ...product,
    added: format(product.added, "yyyy-MM-dd"),
  }));
  res.render("products", {
    title: name,
    products,
  });
};

export { productCategoriesGet, categoryProductsGet };
