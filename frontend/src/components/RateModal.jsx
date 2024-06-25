import React from "react";
import StarIcon from "./icons/StarIcon";

const RateModal = () => {
  return (
    <div className="flex items-center rounded-lg sm:rounded-xl h-12 sm:h-14 w-24 sm:w-28 bg-yellow-500 hover:bg-gray-400 text-blue-600 p-2 cursor-pointer transition duration-300">
      <StarIcon />
      <span className="ml-2 text-base sm:text-lg font-semibold">Rate</span>
    </div>
  );
};

export default RateModal;
