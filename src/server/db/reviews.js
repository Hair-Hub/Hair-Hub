const db = require("./client");

// Function to get reviews by item ID
const getReviewsByItemId = async (itemId) => {
  try {
    const query = `
    SELECT 
      reviews.id AS reviewId,
      reviews.rating,
      reviews.body,
      users.name AS reviewerName
    FROM reviews
    JOIN
      users ON reviews.userId = users.id
    WHERE reviews.itemId = $1;
    `;
    const { rows } = await db.query(query, [itemId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a single review by its ID
const getReviewById = async (parentId) => {
  try {
    const query = `
    SELECT *
    FROM reviews
    WHERE id = $1;
    `;
    const { rows } = await db.query(query, [parentId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all comments for a specific review by its ID
const getCommentsForReview = async (parentId) => {
  try {
    const query = `
    SELECT *
    FROM comments
    WHERE parentId = $1;
    `;
    const { rows } = await db.query(query, [parentId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to create a review
const createReview = async ({ id, userId, username, itemId, rating, parentId, body }) => {
  try {
    const query =`
        INSERT INTO reviews(id, userId, username, itemId, rating, parentId, body)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING * 
        `;
    const values = [id, userId, username, itemId, rating, parentId, body];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to update a review
const updateReview = async (parentId, rating, body) => {
  try {
    const query = `
    UPDATE reviews
    SET rating = $1, body = $2
    WHERE id = $3
    RETURNING *;
    `;
    const values = [rating, body, parentId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a review
const deleteReview = async (parentId) => {
  try {
    const query = `
    DELETE FROM reviews
    WHERE id = $1;

    `;
    await db.query(query, [parentId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReview,
  getReviewsByItemId,
  updateReview,
  deleteReview,
  getCommentsForReview,
  getReviewById,
};
