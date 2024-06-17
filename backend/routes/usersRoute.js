import express from "express";
import User from "../models/userModel.js"; // Ensure the file extension is correct

const router = express.Router(); // Capitalize 'Router'

// Register User
router.post("/register", async (request, response) => {
  // Correct spelling of 'request'
  try {
    const user = await User.create(request.body);
    console.log("New user created"); // Log before returning the response
    return response.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
