import axios from "axios";
import React, { useEffect, useState } from "react";

const MessageList = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5555/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `http://localhost:5555/messages/deletemessage/${messageId}`
      );
      setMessages(messages.filter((message) => message._id !== messageId)); // Update local state after deletion
      console.log(`Message with ID ${messageId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleClose = () => {
    setShowMessages(false);
    onClose();
  };

  if (!showMessages || messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-white">No messages found.</p>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 right-0 h-full bg-gray-800 w-2/5 transition-transform duration-300 transform translate-x-0"
      style={{ zIndex: 1000 }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold text-white">Messages</h3>
          <button
            className="text-white focus:outline-none"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-2"
            >
              <div className="flex items-center space-x-2">
                <span className="text-white">📩</span>
                <p className="text-white">{message.content}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteMessage(message._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
