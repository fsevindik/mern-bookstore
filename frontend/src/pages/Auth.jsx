import React from "react";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {mode === "register" ? (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          {/* Register Form */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          {/* Login Form */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
