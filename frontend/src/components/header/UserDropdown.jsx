import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = ({ onLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const userRole = localStorage.getItem("UserRole");

  const userName = localStorage.getItem("UserName") || "Guest";
  const userNameFirstChar = userName.charAt(0);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    if (onLogout) onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-yellow-400 hover:text-gray-200 focus:outline-none"
      >
        <AiOutlineUser className="mr-1" />
        <span>{userName !== "Guest" ? userName : "Profile"}</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#4c4a48] text-black rounded-md shadow-lg border-2 border-gray-500">
          <div className="p-4 flex items-center text-white">
            {userName !== "Guest" ? (
              <Link
                to={userRole === "admin" ? "/admin" : "/welcome"}
                className="rounded-full hover:ring-2 hover:ring-red-500"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold hover:text-red-500">
                  {userNameFirstChar.toUpperCase()}
                </div>
                {showTooltip && (
                  <div className="absolute bg-red-600 w-full max-w-xs text-white text-md rounded py-1 px-2 top-0 left-0 -translate-x-full transform pointer-events-none">
                    {userRole === "admin"
                      ? "Go to admin dashboard"
                      : "Go to your welcome page"}
                  </div>
                )}
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
                {userNameFirstChar}
              </div>
            )}
            <span className="ml-2">{userName}</span>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="p-2">
            {userName !== "Guest" ? (
              <button
                onClick={handleLogout}
                className="block w-full text-yellow-500 text-left px-4 py-2 text-md rounded-sm hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="block rounded-md text-yellow-500 px-4 py-2 text-sm font-bold hover:text-black hover:bg-yellow-500"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="block rounded-md px-4 py-2 text-sm font-bold text-yellow-500 hover:text-black hover:bg-yellow-500"
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
