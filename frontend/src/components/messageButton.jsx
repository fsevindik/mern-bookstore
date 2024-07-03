import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MessageButton = () => {
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
    try {
      const response = await axios.post("http://localhost:5555/messages/send", {
        sender,
        content,
      });
      console.log("Message sent:", response.data);
      alert("Message sent successfully!");
      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex ml-1 justify-center items-center h-screen relative">
      <button
        className="bg-red-600 hover:bg-blue-600 py-2 px-4 rounded-md mb-4 z-10"
        onClick={() => setIsOpen(true)}
      >
        Send Message
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-40"
            style={{
              backgroundImage: `url('https://i.ytimg.com/vi/xK3nH3StRRs/maxresdefault.jpg')`,
            }}
          />
          <div
            ref={ref}
            className="bg-white p-6 rounded-md shadow-md max-w-md text-center relative z-50 "
            style={{ minWidth: "300px", maxWidth: "90%" }}
          >
            <h2 className="text-2xl font-semibold mb-4 ">
              Send a Message to Admin
            </h2>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="flex flex-col">
                <textarea
                  id="message"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={3}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                className={`bg-black text-white py-2 px-4 rounded-md ${
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

export default MessageButton;
