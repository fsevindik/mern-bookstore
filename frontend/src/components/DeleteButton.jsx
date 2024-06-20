import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const DeleteButton = ({
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
      {userType === "visitor" ? (
        <div
          className={`relative text-red-600 hover:scale-125 ${
            userType === "admin" ? "pointer-events-none cursor-not-allowed" : ""
          }`}
        >
          <MdOutlineDelete className={`text-2xl cursor-not-allowed`} />
          {showTooltip && userType === "visitor" && (
            <div className="absolute bg-gray-800 text-white text-sm py-2 px-4 rounded-md bottom-full left-0 mb-2">
              Only admin can delete
            </div>
          )}
        </div>
      ) : (
        <Link to={`/books/delete/${bookId}`}>
          <MdOutlineDelete
            className={`text-2xl text-red-500 hover:scale-125`}
          />
        </Link>
      )}
    </div>
  );
};

export default DeleteButton;
