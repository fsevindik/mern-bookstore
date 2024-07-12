import axios from "axios";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import AuthContainer from "../components/authComponents/AuthContainer";
import AuthForm from "../components/authComponents/AuthForm";

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
    <AuthContainer>
      <h2 className="text-3xl font-bold mb-6">
        {mode === "register" ? "Register" : "Login"}
      </h2>
      {mode === "register" && (
        <p className="font-mono mb-4 text-sm">
          You may register with a dummy email
        </p>
      )}
      <AuthForm
        mode={mode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        userName={userName}
        setUserName={setUserName}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleAuth={handleAuth}
      />
      <ToastContainer />
    </AuthContainer>
  );
};

export default Auth;
