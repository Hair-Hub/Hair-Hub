const db = require("./client");

const createComment = async ({ userId, reviewId, commentText }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
        INSERT INTO comments(userId, reviewId, commentText)
        VALUES($1,$2,$3)
        RETURNING *
        `,
      [userId, reviewId, commentText]
    );
    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = { createComment };
