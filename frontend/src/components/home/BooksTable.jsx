import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import DetailsButton from "../DetailsButton";
import EditButton from "../EditButton";

const BooksTable = ({ books = [] }) => {
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [editTooltipIndex, setEditTooltipIndex] = useState(null);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  const [deleteTooltipIndex, setDeleteTooltipIndex] = useState(null);
  const [userType, setUserType] = useState("visitor");

  useEffect(() => {
    const userStatus = localStorage.getItem("UserRole");
    if (userStatus) {
      setUserType(userStatus);
    }
  }, []);

  const handleEditMouseEnter = (index) => {
    setShowEditTooltip(true);
    setEditTooltipIndex(index);
  };

  const handleEditMouseLeave = () => {
    setShowEditTooltip(false);
    setEditTooltipIndex(null);
  };

  const handleDeleteMouseEnter = (index) => {
    setShowDeleteTooltip(true);
    setDeleteTooltipIndex(index);
  };

  const handleDeleteMouseLeave = () => {
    setShowDeleteTooltip(false);
    setDeleteTooltipIndex(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="w-1/2 border border-slate-600 rounded-md bg-slate-500">
              Title
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500 hidden md:table-cell">
              Author
            </th>
            <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500 hidden md:table-cell">
              Publish Year
            </th>
            {userType === "admin" && (
              <th className="w-1/6 border border-slate-600 rounded-md bg-slate-500">
                Operations
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-12 bg-gray-300">
              <td className="relative pl-5 ">
                <Link
                  to={`/books/details/${book._id}`}
                  className="flex items-center p-2 hover:bg-yellow-600 cursor-pointer font-serif font-semibold"
                >
                  <img
                    src={book.imageA}
                    alt={book.title}
                    className="h-12 w-12 object-cover mr-2"
                  />
                  <span>{book.title}</span>
                </Link>
              </td>
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell w-1/6">
                {book.publishYear}
              </td>
              {userType === "admin" && (
                <td className="border border-slate-700 rounded-md text-center w-1/6">
                  <div className="flex justify-center gap-x-2 md:gap-x-4">
                    <DetailsButton bookId={book._id} />
                    <EditButton
                      bookId={book._id}
                      userType={userType}
                      index={index}
                      handleMouseEnter={handleEditMouseEnter}
                      handleMouseLeave={handleEditMouseLeave}
                    />
                    <DeleteButton
                      bookId={book._id}
                      userType={userType}
                      index={index}
                      handleMouseEnter={handleDeleteMouseEnter}
                      handleMouseLeave={handleDeleteMouseLeave}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
