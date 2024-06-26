import mongoose from "mongoose";

// Reaction schema
const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId", // ref
    required: false,
  },
  type: {
    type: String,
    enum: ["like", "heart", "smile", "surprise"],
    required: false,
  },
});

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [reactionSchema],
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    imageA: {
      type: String,
      required: true,
    },
    imageB: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
