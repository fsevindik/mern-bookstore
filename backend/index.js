import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import messageRoute from "./routes/messageRoute.js";
import reactionRoute from "./routes/reactionRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN project");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/messages", messageRoute);
app.use("/reactions", reactionRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
