import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex">
      <button
        onClick={handleClick}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg flex items-center hover:bg-sky-700"
      >
        <BsArrowLeft className="text-2xl" />
        <span className="ml-2">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
