import React from "react";
import { AiOutlineBook, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#1a2d55] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-sm italic">
          <Link to="/">Books are the only poison with an antidote</Link>
        </div>
        <nav className="ml-auto flex space-x-4">
          <Link to="/" className="flex items-center hover:text-gray-300">
            <AiOutlineHome className="mr-1" />
            Home
          </Link>
          <Link
            to="/books/allbooks"
            className="flex items-center hover:text-gray-300"
          >
            <AiOutlineBook className="mr-1" />
            Books
          </Link>
          <Link to="/profile" className="flex items-center hover:text-gray-300">
            <AiOutlineUser className="mr-1" />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
