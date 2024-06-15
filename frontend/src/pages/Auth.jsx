import React from "react";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[#808076ce]">
      {mode === "register" ? (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold m-1">Register</h2>
          <p className="font-serif">You may register with dummy email</p>

          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1"></label>
              <input
                type="email"
                placeholder="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          <form>
            <div className="mb-4">
              <input
                type="email"
                placeholder="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
