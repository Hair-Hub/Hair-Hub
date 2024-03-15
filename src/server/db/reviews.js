const db = require("./client");

const createReview = async ({ userId, itemId, rating, reviewText }) => {
  try {
    const {
      rows: [review],
    } = await db.query(
      `
        INSERT INTO reviews(userId, itemId, rating, reviewText)
        VALUES($1, $2, $3, $4)
        RETURNING * `,
      [userId, itemId, rating, reviewText]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = { createReview };
