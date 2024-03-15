const db = require("./client");

const createItem = async (item) => {
  try {
    const { name, brand, category, description, picture } = item;
    const query = `
        INSERT INTO items(name, brand, category, description, picture)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `;
    const values = [name, brand, category, description, picture];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all items
const getAllItems = async () => {
  try {
    const query = `
        SELECT * 
        FROM items;
        `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get item by name
const getItemByName = async (name) => {
  try {
    const query = `
        SELECT *
        FROM items
        WHERE name = $1;
        `;
    const { rows } = await db.query(query, [name]);
    if (rows.length === 0) {
      return null; // item not found
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { createItem, getAllItems, getItemByName };
