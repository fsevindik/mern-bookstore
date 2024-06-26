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

    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear, imageA, imageB } = request.body;

    if (!title || !author || !publishYear || !imageA || !imageB) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear, imageA, imageB",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response
      .status(200)
      .send({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to add a comment to a book
router.post("/:id/comments", async (request, response) => {
  try {
    const { id } = request.params;
    const { text, userId } = request.body;

    if (!text || !userId) {
      return response
        .status(400)
        .send({ message: "Comment text and userId are required" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Add comment to the book's comments array
    const newComment = {
      text,
      userName: user.name,
      userId: user._id,
    };

    book.comments.push(newComment);
    await book.save();

    return response.status(201).json(newComment);
  } catch (error) {
    console.error("Error in comment addition:", error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
