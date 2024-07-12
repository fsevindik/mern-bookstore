import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import PasswordRequirement from "../components/passwordCheck/PasswordRequirement ";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (event, isLogin) => {
    event.preventDefault();
    const endpoint = `${API_URL}${
      isLogin ? "/users/login" : "/users/register"
    }`;

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
        name: userName,
      });

      const { token, name, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("UserName", name);
      localStorage.setItem("UserRole", role);
      localStorage.setItem("userId", response.data._id);
      setLoggedIn(true);
      setUserName(name);
      setUserStatus(role);

      if (role === "visitor") {
        navigate("/welcome");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error(
        isLogin ? "Login error:" : "Registration error:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (loggedIn) {
    if (userStatus === "visitor") {
      return <Navigate to="/welcome" replace />;
    } else if (userStatus === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('https://static01.nyt.com/images/2018/06/03/books/review/03GLASSIE-SUB/03GLASSIE-SUB-videoSixteenByNineJumbo1600.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#a3a385] p-8 rounded-lg shadow-custom w-full max-w-md text-center auth-container">
        <h2 className="text-3xl font-bold mb-6">
          {mode === "register" ? "Register" : "Login"}
        </h2>
        {mode === "register" && (
          <p className="font-mono mb-4 text-sm ">
            You may register with a dummy email
          </p>
        )}
        <form
          onSubmit={(e) => handleAuth(e, mode !== "register")}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md pr-10 focus-ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {mode === "register" && (
            <>
              <PasswordRequirement password={password} />
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border  border-gray-300 rounded-md focus-ring"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-yellow-600 btn-transition"
          >
            {mode === "register" ? "Register" : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
