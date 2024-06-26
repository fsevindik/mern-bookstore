import React, { useState } from "react";
import StarIcon from "./icons/StarIcon";

const RateModal = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`flex border-4 border-gray-700 ml-auto animate-pulse items-center rounded-lg sm:rounded-xl h-12 sm:h-14 w-24 sm:w-28 bg-yellow-500 text-blue-600 p-2 cursor-pointer transition duration-300 ${
        isHovered
          ? "hover:bg-blue-500 hover:animate-none"
          : "hover:bg-yellow-500 "
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      style={{ color: isHovered ? "#fff" : "inherit" }}
    >
      <StarIcon isHovered={isHovered} />
      <span
        className={`ml-2 text-base sm:text-lg font-bold ${
          isHovered ? "text-white" : "text-gray-900"
        }`}
      >
        Rate
      </span>
    </div>
  );
};

export default RateModal;
