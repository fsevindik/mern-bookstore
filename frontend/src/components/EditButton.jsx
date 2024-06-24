import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const EditButton = ({
  bookId,
  userType,
  index,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        handleMouseEnter(index);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        setShowTooltip(false);
      }}
    >
      <Link
        to={`/books/edit/${bookId}`}
        className={`text-yellow-600 transform transition-transform duration-300 ${
          userType === "visitor"
            ? "pointer-events-none cursor-not-allowed"
            : "hover:scale-125"
        }`}
      >
        <AiOutlineEdit
          className={`text-2xl ${
            userType === "visitor" ? "cursor-not-allowed" : ""
          }`}
        />
      </Link>
      {showTooltip && userType === "visitor" && (
        <div className="absolute bg-gray-800 text-white text-sm py-2 px-4 rounded-md bottom-full left-0 mb-2">
          Only admin can manage
        </div>
      )}
    </div>
  );
};

export default EditButton;
