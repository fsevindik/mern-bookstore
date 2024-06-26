import React from "react";

const BookInfo = ({ book }) => {
  return (
    <div className="flex flex-col items-center justify-center my-4 w-full max-w-2xl bg-yellow-500 rounded-xl p-4">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-center items-center mb-4">
          <div className="w-1/2 pr-2 aspect-[3/4]">
            <img
              src={book.imageA}
              alt="Book cover 1"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 pl-2 aspect-[3/4]">
            <img
              src={book.imageB}
              alt="Book cover 2"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-lg text-blue-600">Title :</span>
              <span className="ml-2 font-bold text-gray-800">{book.title}</span>
            </div>
            <div>
              <span className="font-bold text-lg text-blue-600">Author :</span>
              <span className="ml-2 font-bold text-gray-800 ">
                {book.author}
              </span>
            </div>
            <div>
              <span className="font-bold text-lg text-blue-600">
                Publish Year :
              </span>
              <span className="ml-2 font-bold text-gray-800">
                {book.publishYear}
              </span>
            </div>
            <div>
              <span className="font-bold text-lg ">Create Time :</span>
              <span className="ml-2 font-bold text-gray-800">
                {new Date(book.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="col-span-2">
              <span className="font-bold text-lg text-blue-600">
                Last Update Time :
              </span>
              <span className="ml-2 font-bold text-gray-800">
                {new Date(book.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
