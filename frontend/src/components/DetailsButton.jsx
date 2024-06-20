import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const DetailsButton = ({ bookId }) => {
  return (
    <Link to={`/books/details/${bookId}`}>
      <BsInfoCircle className="text-2xl text-green-800 hover:scale-125" />
    </Link>
  );
};

export default DetailsButton;
