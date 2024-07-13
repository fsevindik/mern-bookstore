import React, { useState } from "react";
import { Link } from "react-router-dom";
import MessageList from "../components/MessageList";

const Admin = () => {
  const [showMessages, setShowMessages] = useState(false);

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  return (
    <div className="flex min-h-screen bg-gray-700">
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 w-full md:w-2/5 transition-transform duration-300 transform ${
          showMessages ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 100 }}
      >
        <MessageList toggleMessages={toggleMessages} />
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center mb-8">
            <img
              src="https://i.ytimg.com/vi/ZKpFFD7aX3c/maxresdefault.jpg"
              alt="The Architect"
              className="h-40 w-68 object-cover rounded-lg"
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-yellow-500">
              Welcome, Administrator
            </h1>
            <p className="mt-2 text-white">You got work to do...</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
              onClick={toggleMessages}
            >
              {showMessages ? "Close Messages" : "Open Messages"}
            </button>
            <Link to="/">
              <div className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105">
                <p className="text-xl font-semibold">Manage Books</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
