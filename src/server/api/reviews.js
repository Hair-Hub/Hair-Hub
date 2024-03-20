const express = require("express");
const reviewsRouter = express.Router();

const {
  getReviewsByItemId,
  getReviewsWithComments,
  getCommentsForReview,
  getReviewWithComments,
  createReview,
  updateReview,
  deleteReview,
} = require("../db/reviews");

// Route to get reviews by item ID
reviewsRouter.get("/item/:itemId", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const reviews = await getReviewsByItemId(itemId);
    if (!reviews || reviews.length === 0) {
      res.status(404).send("review's not found for specified item");
    } else {
      res.send(reviews);
    }
  } catch (error) {
    next(error);
  }
});

// Route to get comments for a specific review by its ID
reviewsRouter.get("/:reviewId/comments", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = await getCommentsForReview(reviewId);
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

// Route to get single review by ID along with comments
reviewsRouter.get("/:reviewId/with-comments", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewWithComments = await getReviewWithComments(reviewId);
    if (!reviewWithComments) {
      res.status(404).send("Review not found or has no comments.");
    } else {
      res.send(reviewWithComments);
    }
  } catch (error) {
    next(error);
  }
});

// Route to get reviews by item ID along with comments
reviewsRouter.get("/item/:itemId/with-comments", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const reviewsWithComments = await getReviewsWithComments(itemId);
    if (!reviewsWithComments || reviewsWithComments.length === 0) {
      res
        .status(404)
        .setDefaultEncoding("Reviews not found for specified item");
    } else {
      res.send(reviewsWithComments);
    }
  } catch (error) {
    next(error);
  }
});

// Route to create a review
reviewsRouter.post("/item/:itemId", async (req, res, next) => {
  try {
    const { userId, rating, reviewText } = req.body;
    const itemId = req.params.itemId;
    const review = await createReview({ userId, itemId, rating, reviewText });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

// Route to update a review
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const reviewId = req.params.reviewId;
    const updatedReview = await updateReview(reviewId, rating, reviewText);
    res.send(updatedReview);
  } catch (error) {
    next(error);
  }
});

// Route to delete a review
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    await deleteReview(reviewId);
    res.send("Review deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
