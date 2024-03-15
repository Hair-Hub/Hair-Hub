const express = require("express");
const reviewsRouter = express.Router();

const {
    getReviewsByItemId,
    createReview,
    updateReview,
    deleteReview,
  } = require("../db/reviews");


// Route to get reviews by item ID
reviewsRouter.get("/item/:itemId", async (req, res, next) => {
    try {
        const itemId = rec.params.itemId
        const reviews = await getReviewsByItemId(itemId)
        if (!reviews || reviews.length === 0) {
            res.status(404).send("review's not found for specified item")
        } else {
            res.send(reviews)
        }

    } catch (error) {
        next(error);
    }
})


module.exports = reviewsRouter