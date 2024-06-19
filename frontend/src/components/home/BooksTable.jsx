import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

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
          <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-500">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-500">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md bg-slate-500">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8 bg-gray-300">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800 hover:scale-125" />
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => handleEditMouseEnter(index)}
                  onMouseLeave={handleEditMouseLeave}
                >
                  <Link
                    to={`/books/edit/${book._id}`}
                    className={`text-yellow-600 hover:scale-125 ${
                      userType === "visitor"
                        ? "pointer-events-none cursor-not-allowed"
                        : ""
                    }`}
                    onMouseEnter={() => handleEditMouseEnter(index)}
                    onMouseLeave={handleEditMouseLeave}
                  >
                    <AiOutlineEdit
                      className={`text-2xl ${
                        userType === "visitor" ? "cursor-not-allowed" : ""
                      }`}
                    />
                    {showEditTooltip &&
                      editTooltipIndex === index &&
                      userType === "visitor" && (
                        <div className="absolute bg-gray-800 text-white text-sm py-2 px-4 rounded-md bottom-full left-0 mb-2">
                          Only admin can manage
                        </div>
                      )}
                  </Link>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => handleDeleteMouseEnter(index)}
                  onMouseLeave={handleDeleteMouseLeave}
                >
                  {userType === "visitor" ? (
                    <div
                      className={`relative text-red-600 hover:scale-125 ${
                        userType === "admin"
                          ? "pointer-events-none cursor-not-allowed"
                          : ""
                      }`}
                      onMouseEnter={() => handleDeleteMouseEnter(index)}
                      onMouseLeave={handleDeleteMouseLeave}
                    >
                      <MdOutlineDelete
                        className={`text-2xl cursor-not-allowed`}
                      />
                      {showDeleteTooltip &&
                        deleteTooltipIndex === index &&
                        userType === "visitor" && (
                          <div className="absolute bg-gray-800 text-white text-sm py-2 px-4 rounded-md bottom-full left-0 mb-2">
                            Only admin can delete
                          </div>
                        )}
                    </div>
                  ) : (
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete
                        className={`text-2xl text-red-500 hover:scale-125`}
                      />
                    </Link>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
