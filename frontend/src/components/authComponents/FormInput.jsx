import React from "react";

const AuthContainer = ({ children }) => (
  <div
    className="flex flex-col items-center justify-center min-h-screen"
    style={{
      backgroundImage: `url('https://static01.nyt.com/images/2018/06/03/books/review/03GLASSIE-SUB/03GLASSIE-SUB-videoSixteenByNineJumbo1600.jpg')`,
      backgroundSize: "cover",
    }}
  >
    <div className="bg-[#a3a385] p-8 rounded-lg shadow-custom w-full max-w-md text-center auth-container">
      {children}
    </div>
  </div>
);

export default AuthContainer;
