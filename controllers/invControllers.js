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
  const products = await getCategoryProducts(id);

  res.render("products", {
    title: name,
    products,
  });
};

export { productCategoriesGet, categoryProductsGet };
