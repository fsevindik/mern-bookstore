import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import DetailsButton from "../DetailsButton";
import EditButton from "../EditButton";

const BooksTable = ({ books }) => {
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
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md bg-slate-500">
            No
          </th>
          <th className="border border-slate-600 rounded-md bg-slate-500">
            Title
          </th>
          <th className="border border-slate-600 rounded-md bg-slate-500 hidden md:table-cell">
            Publish Year
          </th>
          {userType === "admin" && (
            <th className="border border-slate-600 rounded-md bg-slate-500">
              Operations
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8 bg-gray-300">
            <td className="border border-slate-700 rounded-md text-center ">
              {index + 1}
            </td>
            <Link key={book._id} to={`/books/details/${book._id}`}>
              <td className="border border-slate-700 hover:bg-slate-400  cursor-pointer rounded-md text-left flex items-center p-2 font-serif font-semibold">
                <img
                  src={book.imageA}
                  alt={book.title}
                  className="h-12 w-12 object-cover mr-2 "
                />
                {book.title}
              </td>
            </Link>
            <td className="border border-slate-700 rounded-md text-center font-semibold hidden md:table-cell">
              {book.publishYear}
            </td>
            {userType === "admin" && (
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
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
  );
};

export default BooksTable;
