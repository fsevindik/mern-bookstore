import React from "react";
import { Link } from "react-router-dom";

const Welcome = ({ username }) => {
  return (
    <div className="flex flex-grow h-full items-center justify-center min-h-screen bg-yellow-500">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome {username}</h2>
        <p className="mb-4">Congrats... !!! You have successfully logged in.</p>
        <p className="mb-4">Enjoy exploring our bookstore!</p>
        <ul className="list-disc list-inside text-left mb-4">
          <li className="animate-pulse text-red-500">
            You have access to comments for all books.
          </li>
          <li className="animate-pulse text-red-500">
            Now you can like or dislike any of them.
          </li>
          <li className="animate-pulse text-red-500">
            Also, you may request new books directly to the manager.
          </li>
        </ul>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          <Link
            to="/books/trends"
            className="flex items-center hover:text-gray-300"
          >
            Explore Books
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
