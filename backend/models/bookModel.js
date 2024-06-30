import mongoose from "mongoose";

// Reaction schema
const reactionSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0,
  },
  heart: {
    type: Number,
    default: 0,
  },
  smile: {
    type: Number,
    default: 0,
  },
  surprise: {
    type: Number,
    default: 0,
  },
});

const rateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
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
  reactions: {
    type: reactionSchema,
    default: () => ({}),
  },
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
    ratings: [rateSchema],
    comments: [commentSchema],
  },
  { timestamps: true }
);

bookSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return total / this.ratings.length;
};

const Book = mongoose.model("Book", bookSchema);

export { Book };
