import React, { useContext, useRef, useState } from "react";
import { AiOutlineBook, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import BooksContext from "../../context/BookDb";
import UserDropdown from "./UserDropdown";
const mode = new URLSearchParams(location.search).get("mode");

const Header = ({ user }) => {
  const { handleSearch } = useContext(BooksContext);
  const inputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeoutRef = useRef(null);

  const debounceSearch = (value) => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      handleSearch(value)
        .then((results) => {
          setSearchResults(results);
        })
        .catch((error) => {
          console.error("Error searching:", error);
          setSearchResults([]);
        });
    }, 400);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    debounceSearch(inputValue);
  };

  const handleButtonClick = () => {
    debounceSearch(inputRef.current.value);
  };

  const resetSearch = () => {
    inputRef.current.value = "";
    setSearchTerm("");
    setSearchResults([]);
    handleSearch("");
  };

  return (
    <header className="bg-[#121212] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-yellow-300 text-lg font-sm italic w-full md:w-auto text-center md:text-left mb-2 md:mb-0 p-1 bg-inherit rounded-md hover:bg-[#4c515e] cursor-pointer">
          <p>Books are the only poison with an antidote.</p>
        </div>
        {mode !== "login" && mode !== "register" && (
          <div className="flex items-center justify-center mt-4 md:mt-0 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="p-2 mr-2 w-full md:w-auto max-w-sm bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <button
              className="p-2 bg-yellow-500 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={handleButtonClick}
            >
              Search
            </button>
          </div>
        )}

        <nav className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0 space-x-4">
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
        {searchResults.length > 0 && (
          <div className="mt-4 text-center w-full">
            <button
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={resetSearch}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
