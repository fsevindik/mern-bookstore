import express from "express";
import { Book } from "../models/bookModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// get all boooks
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get specific book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// create book
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear, imageA, imageB } = request.body;
    if (!title || !author || !publishYear || !imageA || !imageB) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear, imageA, imageB",
      });
    }
    const newBook = {
      title,
      author,
      publishYear,
      imageA,
      imageB,
      comments: [],
      ratings: [],
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update book
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, publishYear, imageA, imageB } = request.body;
    if (!title || !author || !publishYear || !imageA || !imageB) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear, imageA, imageB",
      });
    }
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// add comments
router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, userId } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      text: content,
      userName: user.name,
      userId: user._id,
      createdAt: new Date(),
    };

    book.comments.push(newComment);
    await book.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// rate for book
router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existingRatingIndex = book.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );
    if (existingRatingIndex > -1) {
      book.ratings[existingRatingIndex].rating = rating;
    } else {
      book.ratings.push({ userId, rating });
    }

    await book.save();
    const averageRating = book.calculateAverageRating();

    res.json({ averageRating });
  } catch (error) {
    console.error("Error rating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get average of book
router.get("/:id/averageRating", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const averageRating = book.calculateAverageRating();
    res.json({ averageRating });
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add reaction to comment
router.post("/:bookId/comments/:commentId/reactions", async (req, res) => {
  try {
    const { bookId, commentId } = req.params;
    const { userId, reactionType } = req.body;

    //
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const comment = book.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // do the math in db
    switch (reactionType) {
      case "like":
        comment.reactions.like++;
        break;
      case "heart":
        comment.reactions.heart++;
        break;
      case "smile":
        comment.reactions.smile++;
        break;
      case "applaud":
        comment.reactions.applaud++;
        break;
      default:
        return res.status(400).json({ message: "Invalid reaction type" });
    }

    await book.save();

    res.status(201).json({ message: "Reaction added successfully" });
  } catch (error) {
    console.error("Error adding reaction:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reactions for a comment
router.get("/:bookId/comments/:commentId/reactions", async (req, res) => {
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
