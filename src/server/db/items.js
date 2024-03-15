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

module.exports = { createItem };
