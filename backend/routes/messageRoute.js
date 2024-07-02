import express from "express";
import Message from "../models/messageModal.js";

const router = express.Router();

// get all
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().populate("sender recipient");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    }).populate("sender recipient");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching user messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// send
router.post("/send", async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get for admin all of them
router.get("/admin/messages", async (req, res) => {
  const adminUserId = "adminUserId";
  try {
    const messages = await Message.find({ recipient: adminUserId }).populate(
      "sender"
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching admin messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
