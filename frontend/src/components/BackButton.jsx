import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="bg-red-700 sm:h-8 sm: md:h-12 md:w-28 text-white font-bold px-4 py-1 rounded-lg flex items-center  hover:bg-gray-500"
      >
        <BsArrowLeft className="text-2xl " />
        <span className="ml-2">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
