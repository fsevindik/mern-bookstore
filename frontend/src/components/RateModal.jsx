import React, { useState } from "react";
import StarIcon from "./icons/StarIcon";

const RateModal = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRating = (rate) => {
    setRating(rate);
    setIsOpen(false);
    alert(`Rated ${rate} stars`);
  };

  const handleHoverRating = (rate) => {
    setHoverRating(rate);
  };

  const handleLeaveRating = () => {
    setHoverRating(0);
  };

  return (
    <div className="relative">
      <div
        className={`flex border-4 border-gray-700 ml-auto animate-pulse items-center rounded-lg sm:rounded-xl h-10 sm:h-12 lg:h-14 xl:h-16 w-20 sm:w-24 lg:w-28 xl:w-32 bg-yellow-500 text-blue-600 p-2 cursor-pointer transition duration-300 ${
          isHovered
            ? "hover:bg-blue-500 hover:animate-none"
            : "hover:bg-yellow-500 "
        }`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ color: isHovered ? "#fff" : "inherit" }}
      >
        <StarIcon isHovered={isHovered} />
        <span
          className={`ml-2 text-sm sm:text-base lg:text-lg xl:text-xl font-bold ${
            isHovered ? "text-white" : "text-gray-900"
          }`}
        >
          Rate
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 h-1/2 bg-gray-800 p-6 sm:p-10 z-20">
          <div className="flex justify-end mb-4">
            <button
              className="text-white text-2xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
            <span className="text-yellow-500">Your Rate for:</span> {book.title}
          </h3>
          <div className="flex justify-center space-x-2">
            {[...Array(10)].map((_, index) => (
              <StarIcon
                key={index}
                className={`cursor-pointer w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
                  index + 1 <= (hoverRating || rating)
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => handleRating(index + 1)}
                onMouseEnter={() => handleHoverRating(index + 1)}
                onMouseLeave={handleLeaveRating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RateModal;
