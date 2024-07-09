import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const UserMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const ref = useRef(null);

  const sender = localStorage.getItem("userId");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const recipient = localStorage.getItem("UserName");

    try {
      const response = await axios.post(
        "https://mern-bookstore-6hsv.onrender.com/messages/sendmessage",
        {
          sender,
          recipient,
          content,
        }
      );
      console.log("Message sent:", response.data);
      alert("Message sent successfully!");
      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      alert(
        `Failed to send message: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-red-600 hover:bg-blue-600 py-2 px-4 rounded-md mb-4 shadow-md"
        onClick={() => setIsOpen(true)}
      >
        Send Message
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-md p-4 max-w-xs md:max-w-md w-full">
            <div className="flex justify-end">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
              Send a Message to👨🏻‍💻
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                id="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              />
              <button
                type="submit"
                className={`bg-black text-white py-2 px-4 rounded-md w-full ${
                  sending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-600"
                }`}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMessage;
