import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import messageRoute from "./routes/messageRoute.js";
import reactionRoute from "./routes/reactionRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN project");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/messages", messageRoute);
app.use("/reactions", reactionRoute);

mongoose
  .connect(mongoDBURL, {
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
