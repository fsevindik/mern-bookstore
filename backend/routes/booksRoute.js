import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to create a new book
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
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one specific book from the database by Id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a book
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

    const updatedBook = {
      title,
      author,
      publishYear,
      imageA,
      imageB,
    };

    const book = await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response
      .status(200)
      .send({ message: "Book updated successfully", book });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to rate
router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    //
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
// Route to get average rating of a book
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

// Route to  reaction for a comment
router.post(
  "/:bookId/comments/:commentId/reactions",
  async (request, response) => {
    try {
      const { bookId, commentId } = request.params;
      const { reactionType, increment = true } = request.body;

      const book = await Book.findOne({ "comments._id": commentId });
      if (!book) {
        return response.status(404).send({ message: "Comment not found" });
      }

      const comment = book.comments.id(commentId);

      if (
        !comment.reactions[reactionType] &&
        comment.reactions[reactionType] !== 0
      ) {
        return response.status(400).send({ message: "Invalid reaction type" });
      }

      // Increment or decrement reaction count
      if (increment) {
        comment.reactions[reactionType] += 1;
      } else {
        comment.reactions[reactionType] = Math.max(
          comment.reactions[reactionType] - 1,
          0
        );
      }

      await book.save();

      return response.status(200).send({
        reactions: comment.reactions,
        message: "Reaction updated successfully",
      });
    } catch (error) {
      console.log("Error in reaction update:", error);
      response.status(500).send({ message: error.message });
    }
  }
);

export default router;
