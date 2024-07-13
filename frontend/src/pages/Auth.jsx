import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import AuthContainer from "../components/authComponents/AuthContainer";
import AuthForm from "../components/authComponents/AuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (loggedIn && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loggedIn, countdown]);
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
      setCountdown(4);
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 4000,
      });

      setTimeout(() => {
        if (role === "visitor") {
          navigate("/welcome");
        } else if (role === "admin") {
          navigate("/admin");
        }
      }, 5000);
    } catch (error) {
      console.error(
        isLogin ? "Login error:" : "Registration error:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthContainer>
      <AnimatePresence>
        {!loggedIn ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-center"
          >
            <motion.h2
              className="text-2xl font-bold mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              Welcome, {userName}!
            </motion.h2>
            <p>Login successful! Redirecting...</p>
            <motion.p
              className="mt-4 text-lg"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              You will be redirected in {countdown} seconds.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </AuthContainer>
  );
};

export default Auth;
