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

    const comment = book.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    switch (reactionType) {
      case "like":
        if (!comment.reactions.usersLiked.includes(userId)) {
          comment.reactions.like++;
          comment.reactions.usersLiked.push(userId);
          console.log("Added user to usersLiked array");
        } else {
          console.log("User already liked this comment, removing like...");
          comment.reactions.like--;
          comment.usersLiked.splice(userIndex, 1);
        }
        break;
      // rest of the cases will come for next project :)
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
