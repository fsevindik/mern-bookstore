import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Add reaction
router.post("/:bookId/comments/:commentId/postreactions", async (req, res) => {
  try {
    const { bookId, commentId } = req.params;
    const { userId, reactionType } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const comment = book.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    switch (reactionType) {
      case "like":
        const userIndex = comment.usersLiked.indexOf(userId);
        if (userIndex === -1) {
          comment.reactions.like++;
          comment.usersLiked.push(userId);
        } else {
          comment.reactions.like--;
          comment.usersLiked.splice(userIndex, 1);
        }
        break;
      // Handle other reaction types similarly
      default:
        return res.status(400).json({ message: "Invalid reaction type" });
    }

    await book.save();

    res.status(201).json({
      message: "Reaction toggled successfully",
      reactions: comment.reactions,
    });
  } catch (error) {
    console.error("Error adding reaction:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reactions
router.get("/:bookId/comments/:commentId/getreactions", async (req, res) => {
  try {
    const { bookId, commentId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const comment = book.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment.reactions);
  } catch (error) {
    console.error("Error getting reactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
