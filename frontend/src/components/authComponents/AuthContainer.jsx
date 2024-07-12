import React from "react";
const AuthContainer = ({ children }) => (
  <div
    className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url('https://static01.nyt.com/images/2018/06/03/books/review/03GLASSIE-SUB/03GLASSIE-SUB-videoSixteenByNineJumbo1600.jpg')`,
    }}
  >
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      {children}
    </div>
  </div>
);

export default AuthContainer;
