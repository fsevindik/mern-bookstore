import React from "react";
import { AiOutlineBook, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#2f4277] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div
          className="text-lg font-sm italic w-full md:w-auto text-center md:text-left mb-2 md:mb-2 p-1 bg-inherit
        rounded-sm hover:bg-[#60677a] cursor-none
        "
        >
          <p>Books are the only poison with an antidote.</p>
        </div>
        <nav className="w-full md:w-auto flex justify-center md:justify-end space-x-4">
          <Link to="/" className="flex items-center hover:text-gray-300">
            <AiOutlineHome className="mr-1" />
            <span>Home</span>
          </Link>
          <Link
            to="/books/allbooks"
            className="flex items-center hover:text-gray-300"
          >
            <AiOutlineBook className="mr-1" />
            <span>Bestsellers</span>
          </Link>
          <Link to="/profile" className="flex items-center hover:text-gray-300">
            <AiOutlineUser className="mr-1" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
