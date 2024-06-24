import React, { useContext, useRef } from "react";
import { AiOutlineBook, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import BooksContext from "../../context/BookDb";
import UserDropdown from "./UserDropdown";

const Header = ({ user }) => {
  const { handleSearch } = useContext(BooksContext);
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    console.log("Input Value:", inputValue);
    handleSearch(inputValue);
  };

  return (
    <header className="bg-[#121212] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-yellow-300 text-lg font-sm italic w-full md:w-auto text-center md:text-left mb-2 md:mb-2 md:p-1 bg-inherit rounded-md hover:bg-[#4c515e] cursor-pointer">
          <p>Books are the only poison with an antidote.</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="search"
            className="text-black"
            ref={inputRef}
          />
          <button
            className="p-1 text-white m-1 border-2 border-yellow-500 rounded-md hover:bg-yellow-500"
            onClick={handleButtonClick}
          >
            search
          </button>
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
