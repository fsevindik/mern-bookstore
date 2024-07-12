import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
}) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <FaEye className="h-5 w-5" />
      ) : (
        <FaEyeSlash className="h-5 w-5" />
      )}
    </button>
  </div>
);

export default PasswordInput;
