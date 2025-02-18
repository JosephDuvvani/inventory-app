import { format } from "date-fns";
import { pool } from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await pool.query(`
        SELECT * FROM categories;
    `);
  return rows;
};

const getCategoryProducts = async (id) => {
  const { rows } = await pool.query(
    `
        SELECT products.id, products.name, products.performance, products.in_stock, products.unit_price, products.added FROM products 
            JOIN product_categories ON products.id = product_id 
            JOIN categories ON categories.id = category_id 
            WHERE category_id = ($1);
    `,
    [id]
  );
  return rows;
};

const getCategoryName = async (id) => {
  const { rows } = await pool.query(
    `
            SELECT name FROM categories WHERE id = ($1);
        `,
    [id]
  );
  return rows;
};

const getTopSellingByUnits = async () => {
  const { rows } = await pool.query(`
      SELECT name, performance FROM products 
      ORDER BY performance DESC LIMIT 5;
    `);
  return rows;
};

const getRecentlyAdded = async () => {
  const { rows } = await pool.query(`
      SELECT name, performance, unit_price, added FROM products 
      ORDER BY added DESC LIMIT 8;
    `);
  return rows;
};

const getAllProducts = async () => {
  const { rows } = await pool.query(`
      SELECT products.name, performance, categories.name AS category, in_stock, unit_price, added FROM products 
      JOIN product_categories ON products.id = product_id 
      JOIN categories ON categories.id = category_id;
    `);
  return rows;
};

const addNewProduct = async ({ name, quantity, price, category }) => {
  const { rows } = await pool.query(`
      SELECT MAX(id) FROM products;
    `);
  const newId = rows[0].max + 1;
  await pool.query(`
      INSERT INTO products (name, in_stock, unit_price, added) 
      VALUES 
      ('${name}', ${quantity}, ${price}, '${format(new Date(), "yyyy-MM-dd")}');
    `);
  await pool.query(`
      INSERT INTO product_categories (product_id, category_id) 
      VALUES (${newId}, ${category});
    `);
};

const createCategory = async ({ name }) => {
  await pool.query(`
      INSERT INTO categories (name) VALUES ('${name}');
    `);
};

export {
  getAllCategories,
  getCategoryProducts,
  getCategoryName,
  getTopSellingByUnits,
  getRecentlyAdded,
  getAllProducts,
  addNewProduct,
  createCategory,
};
