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
        SELECT products.id, products.name, products.in_stock, products.unit_price, products.added FROM products 
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

export { getAllCategories, getCategoryProducts, getCategoryName };
