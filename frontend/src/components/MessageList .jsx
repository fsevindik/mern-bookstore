import axios from "axios";
import React, { useEffect, useState } from "react";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5555/messages/getmessage"
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const toggleReadStatus = async (messageId, isRead) => {
    try {
      await axios.put(`http://localhost:5555/messages/markread/${messageId}`, {
        isRead,
      });
      setMessages(
        messages.map((message) => {
          if (message._id === messageId) {
            return { ...message, isRead };
          }
          return message;
        })
      );
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5555/messages/delete/${messageId}`);
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (messages.length === 0) {
    return <p className="text-white font-bold">No messages found.</p>;
  }

  return (
    <div>
      <h2 className="text-white text-2xl mb-4 font-bol text-center ">
        Messages
      </h2>
      <ul className="divide-y divide-gray-200">
        {messages.map((message) => (
          <li
            key={message._id}
            className={`py-4 ${message.isRead ? "bg-gray-100" : "bg-white"}`}
          >
            <div className="flex justify-between items-center p-1 m-2 border-2 border-separate">
              <div className="text-black">
                <p>
                  <strong>Sender(ID): </strong> {message.sender}
                </p>
                <p className="bg-yellow-500">
                  <strong>Name: </strong> {message.recipient}
                </p>
                <p className="bg-slate-300">
                  <strong>Content:</strong> {message.content}
                </p>
                <p className="bg-green-400">
                  <strong>Time:</strong>{" "}
                  {new Date(message.sentAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={message.isRead}
                  onChange={(e) =>
                    toggleReadStatus(message._id, e.target.checked)
                  }
                  className="form-checkbox h-8 w-8 animate-pulse  text-green-500 focus:outline-none focus:shadow-outline cursor-pointer"
                />
                <button
                  onClick={() => deleteMessage(message._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
