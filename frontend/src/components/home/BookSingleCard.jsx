import { useState } from "react";
import { AiOutlineDislike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-gray-500 rounded-lg relative hover:shadow-xl bg-[#ded6bb] flex">
      <div className="absolute top-1 left-1 flex flex-col justify-between items-center">
        <div className="border border-gray-500 bg-slate-400 rounded-md mb-1">
          <AiOutlineLike className="text-3xl text-green-700 hover:text-green-900 cursor-pointer" />
        </div>
        <div className="border border-gray-500 bg-slate-400 rounded-md">
          <AiOutlineDislike className="text-3xl text-red-700 hover:text-red-900 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 pl-12">
        <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-400 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-400 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
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
