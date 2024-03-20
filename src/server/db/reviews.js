const db = require("./client");

// Function to get reviews by item ID
const getReviewsByItemId = async (itemId) => {
  try {
    const query = `
    SELECT *
    FROM reviews
    WHERE itemId = $1;
    `;
    const { rows } = await db.query(query, [itemId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get reviews with comments
const getReviewsWithComments = async (itemId) => {
  try {
    const query = `
    SELECT
      reviews.id AS reviewId,
      reviews.rating,
      reviews.reviewText,
      users.name AS reviewerName,
      comments.commentText,
      comments.userId AS commenterId,
      comments.reviewId
    FROM
      reviews
    JOIN
      users ON reviews.userId = users.id
    LEFT JOIN
      comments ON reviews.id = comments.reviewId
    WHERE
      reviews.itemId = $1;
    `;
    const { rows } = await db.query(query, [itemId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a single review by its ID
const getReviewById = async (reviewId) => {
  try {
    const query = `
    SELECT *
    FROM reviews
    WHERE id = $1;
    `;
    const { rows } = await db.query(query, [reviewId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all comments for a specific review by its ID
const getCommentsForReview = async (reviewId) => {
  try {
    const query = `
    SELECT *
    FROM comments
    WHERE reviewId = $1;
    `;
    const { rows } = await db.query(query, [reviewId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a single review along with its comments
const getReviewWithComments = async (reviewId) => {
  try {
    const review = await getReviewById(reviewId);
    const comments = await getCommentsForReview(reviewId);
    return { review, comments };
  } catch (error) {
    throw error;
  }
};

// Function to create a review
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

// Function to update a review
const updateReview = async (reviewId, rating, reviewText) => {
  try {
    const query = `
    UPDATE reviews
    SET rating = $1, reviewText = $2
    WHERE id = $3
    RETURNING *;
    `;
    const values = [rating, reviewText, reviewId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a review
const deleteReview = async (reviewId) => {
  try {
    const query = `
    DELETE FROM reviews
    WHERE id = $1;

    `;
    await db.query(query, [reviewId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReview,
  getReviewsByItemId,
  updateReview,
  deleteReview,
  getReviewsWithComments,
  getCommentsForReview,
  getReviewById,
  getReviewWithComments,
};
