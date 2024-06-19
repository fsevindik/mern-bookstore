import React from "react";
import { AiOutlineBook, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const Header = ({ user }) => {
  return (
    <header className="bg-[#121212] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-yellow-300 text-lg font-sm italic w-full md:w-auto text-center md:text-left mb-2 md:mb-2 md:p-1 bg-inherit rounded-md hover:bg-[#4c515e] cursor-none">
          <p>Books are the only poison with an antidote.</p>
        </div>
        <nav className="w-full md:w-auto flex justify-center md:justify-end space-x-4">
          <div className="rounded-md p-1 hover:bg-yellow-600">
            <Link
              to="/"
              className="flex items-center text-yellow-400 hover:text-gray-200"
            >
              <AiOutlineHome className="mr-1" />
              <span>Home</span>
            </Link>
          </div>
          <div className="rounded-md p-1 hover:bg-yellow-600">
            <Link
              to="/books/trends"
              className="flex items-center text-yellow-400 hover:text-gray-200"
            >
              <AiOutlineBook className="mr-1" />
              <span>Bestsellers</span>
            </Link>
          </div>
          <div className="rounded-md p-1 hover:bg-yellow-600">
            <UserDropdown user={user} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
