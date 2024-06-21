import React, { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={` ${showDrawer ? "block" : "hidden"}`}>
        <div className="absolute inset-y-0  left-0 bg-gray-800 w-2/5 h-full">
          <div className="flex flex-col h-full ">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-white">Messages</h3>
              <button
                className="text-white focus:outline-none"
                onClick={toggleDrawer}
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
          </div>
        </div>
      </div>

      <div className="">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg"
          onClick={toggleDrawer}
        >
          {showDrawer ? "Close Messages" : "Open Messages"}
        </button>
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
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome, Administrator
            </h1>
            <p className="text-gray-600 mt-2">
              You have important tasks ahead.
            </p>
          </div>
          <Link to="/">
            <div className="grid grid-cols-1 gap-">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-center">
                <p className="text-xl font-semibold">Manage Books</p>
                <p className="text-sm mt-2">Review and update Book</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
