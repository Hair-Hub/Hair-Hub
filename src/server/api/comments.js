const express = require("express");
const commentsRouter = express.Router();

const {
  createComment,
  getCommentsByParentId,
  updateComment,
  deleteComment,
} = require("../db/comments");

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  // Check if the header is present
  if (authHeader) {
    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      // If token is valid, set the user object in the request
      req.user = user;
      next();
    });
  } else {
    // If header is not present, return 401 Unauthorized
    res.status(401).json({ message: 'Authorization header missing' });
  }
};

module.exports = verifyToken;

// Route to create comment
commentsRouter.post("/review/:reviewId", verifyToken, async (req, res, next) => {
  try {
    const { userId, username, parentId, body } = req.body;
    const reviewId = req.params.reviewId;
    // Ensure userId matches the user making the request
    if (userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const comment = await createComment({ userId, username, parentId, reviewId, body });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Route to get comments by review ID
commentsRouter.get("/review/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = await getCommentsByParentId(reviewId);
    if (!comments || comments.length === 0) {
      res.status(404).send("Comments not found for specified review");
    } else {
      res.send(comments);
    }
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/review/:reviewId", async (req, res, next) => {
  try {
    const { userId, username, parentId, body } = req.body;
    const reviewId = req.params.reviewId;
    const comment = await createComment({ userId, username, parentId, reviewId, body });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Route to update a comment
commentsRouter.put("/commentId", async (req, res, next) => {
  try {
    const { body } = req.body;
    const commentId = req.params.commentId;
    const updatedComment = await updateComment(commentId, body);
    res.send(updatedComment);
  } catch (error) {
    next(error);
  }
});

// route to delete a comment
commentsRouter.delete("/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    await deleteComment(commentId);
    res.send("Comment deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
