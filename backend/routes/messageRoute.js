import express from "express";
import Message from "../models/messageModal.js";

const router = express.Router();

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().populate("sender recipient");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/messages/send", async (req, res) => {
  const { sender, content } = req.body;
  try {
    const newMessage = new Message({ sender, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a message by ID
router.delete("/messages/deletemessage/:messageId", async (req, res) => {
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
