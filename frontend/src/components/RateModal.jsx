import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StarIcon from "./icons/StarIcon";

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

const RateModal = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => setIsOpen(false));

  const handleHover = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5555/books/${book._id}/user-rating/${userId}`
        );
        if (response.status === 200) {
          setRating(response.data.rating);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error.response || error);
      }
    };

    fetchUserRating();
  }, [book._id]);

  const handleRating = async (rate) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/books/${book._id}/rate`,
        {
          userId: localStorage.getItem("userId"),
          rating: rate,
        }
      );

      if (response.status === 200) {
        setRating(response.data.averageRating);
        setIsOpen(false);
        alert(`Rated ${rate} stars`);
      } else {
        throw new Error("Failed to rate the book.");
      }
    } catch (error) {
      console.error("Error rating the book:", error.response || error);
    }
  };

  const handleHoverRating = (rate) => setHoverRating(rate);
  const handleLeaveRating = () => setHoverRating(0);

  return (
    <div className="relative ml-auto">
      <div
        className={`flex border-4 border-gray-700 ml-auto animate-pulse items-center rounded-lg sm:rounded-xl h-10 sm:h-12 lg:h-14 xl:h-16 w-20 sm:w-24 lg:w-28 xl:w-32 bg-yellow-500 text-blue-600 p-2 cursor-pointer transition duration-300 ${
          isHovered
            ? "hover:bg-blue-500 hover:animate-none"
            : "hover:bg-yellow-500"
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-20">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8 w-full sm:max-w-lg"
          >
            <div className="flex justify-end">
              <button
                className="text-white text-3xl hover:text-yellow-400 hover:scale-125"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center mb-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-1 text-center">
                <span className="text-yellow-500">Your Rate for</span>{" "}
                {book.title}
              </h3>
              <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-500 text-center">
                {rating}
              </h3>
            </div>
            <div className="flex justify-center space-x-1 sm:space-x-1 md:space-x-4 lg:space-x-6">
              {[...Array(10)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`cursor-pointer w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 hover:scale-110 ${
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
        </div>
      )}
    </div>
  );
};

export default RateModal;
