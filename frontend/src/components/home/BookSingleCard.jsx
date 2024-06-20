import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-gray-500 rounded-lg relative hover:shadow-xl bg-gray-600 flex flex-col md:flex-row">
      <div className="flex-none p-4 md:w-48 md:p-6">
        <img
          src={
            book.imageUrl
              ? book.imageUrl
              : "https://www.boundless.co.uk/-/media/PartnerAssetsSet/The%20Cinema%20Society/240723/People%20enjoying%20a%20film%20at%20the%20cinema.jpg?mw=640&hash=A155971BB259F637E4B1C8B1DA25A601"
          }
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 p-4 md:p-6">
        <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-yellow-500 text-2xl" />
          <h2 className="my-1 text-white font-bold">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-yellow-500 text-2xl" />
          <h2 className="my-1 text-white">{book.author}</h2>
        </div>
        <div className="flex justify-between items-center gap-x-2 mt-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-white hover:text-black" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-black" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-500 hover:text-black" />
          </Link>
        </div>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;
