import { format } from "date-fns";
import {
  addNewProduct,
  createCategory,
  getAllCategories,
  getAllProducts,
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

const allCategoriesGet = async (req, res) => {
  const categories = await getAllCategories();
  res.render("categories", {
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

const allProductsGet = async (req, res) => {
  const all = await getAllProducts();
  const products = all.map((product) => ({
    ...product,
    added: format(product.added, "yyyy-MM-dd"),
  }));
  res.render("products", {
    title: "ALL PRODUCTS",
    products,
  });
};

const newProductGet = async (req, res) => {
  const categories = await getAllCategories();
  res.render("newProduct", { categories });
};

const newProductPost = async (req, res) => {
  const data = req.body;
  await addNewProduct(data);
  res.redirect("/");
};

const newCategoryPost = async (req, res) => {
  await createCategory(req.body);
  res.redirect("/categories");
};

export {
  productCategoriesGet,
  categoryProductsGet,
  allProductsGet,
  newProductGet,
  newProductPost,
  allCategoriesGet,
  newCategoryPost,
};
