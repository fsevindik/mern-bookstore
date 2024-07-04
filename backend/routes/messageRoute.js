import express from "express";
import Message from "../models/messageModal.js";

const router = express.Router();

// Get all messages
router.get("/getmessage", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
});

// Send a message
router.post("/sendmessage", async (req, res) => {
  const { sender, recipient, content } = req.body;

  try {
    const message = new Message({
      sender,
      recipient,
      content,
    });

    await message.save();
    console.log("Message sent successfully");

    res.status(201).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a message by ID
router.delete("/deletemessage/:messageId", async (req, res) => {
  const { messageId } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res
      .status(200)
      .json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
