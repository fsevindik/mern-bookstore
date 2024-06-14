import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserDropdown = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userName = user?.name || "Guest";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center hover:text-gray-300 focus:outline-none"
      >
        <AiOutlineUser className="mr-1" />
        <span>Profile</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
          <div className="p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {userName.charAt(0)}
            </div>
            <span className="ml-2">{userName}</span>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="p-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  View Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
