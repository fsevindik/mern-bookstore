import React from "react";
import PasswordRequirement from "../passwordCheck/PasswordRequirement ";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

const AuthForm = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  userName,
  setUserName,
  showPassword,
  togglePasswordVisibility,
  handleAuth,
}) => (
  <form
    onSubmit={(e) => handleAuth(e, mode !== "register")}
    className="space-y-4"
  >
    <FormInput
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <PasswordInput
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
    />
    {mode === "register" && (
      <>
        <PasswordRequirement password={password} />
        <FormInput
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </>
    )}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      {mode === "register" ? "Register" : "Login"}
    </button>
  </form>
);

export default AuthForm;
