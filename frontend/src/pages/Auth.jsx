import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState("");

  const handleAuth = async (event, isLogin) => {
    event.preventDefault();
    const endpoint = `http://localhost:5555${
      isLogin ? "/users/login" : "/users/register"
    }`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name: userName }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message ||
            (isLogin ? "Login failed" : "Registration failed")
        );
      }

      const responseData = await response.json();
      const { token, name, role } = responseData;

      localStorage.setItem("token", token);
      localStorage.setItem("UserName", name);
      localStorage.setItem("UserRole", role);
      localStorage.setItem("userId", responseData._id);
      setLoggedIn(true);
      setUserName(name);
      setUserStatus(role);
    } catch (error) {
      console.error(
        isLogin ? "Login error:" : "Registration error:",
        error.message
      );
      alert(error.message);
    }
  };

  if (loggedIn) {
    if (userStatus === "visitor") {
      return <Navigate to="/welcome" replace />;
    } else if (userStatus === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3c3c35ce]">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold m-1">
          {mode === "register" ? "Register" : "Login"}
        </h2>
        {mode === "register" && (
          <p className="font-serif">You may register with a dummy email</p>
        )}
        <form onSubmit={(e) => handleAuth(e, mode !== "register")}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {mode === "register" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800"
          >
            {mode === "register" ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
