import { format } from "date-fns";
import {
  getAllCategories,
  getCategoryName,
  getCategoryProducts,
  getRecentlyAdded,
  getTopSellingByUnits,
} from "../db/queries.js";

const productCategoriesGet = async (req, res) => {
  const categories = await getAllCategories();
  const topUnits = await getTopSellingByUnits();
  const recently = await getRecentlyAdded();
  const recentlyAdded = recently.map((prod) => ({
    ...prod,
    added: format(prod.added, "d MMM yyyy"),
  }));
  res.render("index", {
    title: "All Categories",
    categories,
    topUnits,
    recentlyAdded,
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
