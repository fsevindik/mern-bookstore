import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
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

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database (MongoDb)");
    app.listen(PORT, () => {
      console.log(`App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
