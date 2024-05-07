import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const Cat = mongoose.model("Cat", { name: bookSchema });
