import React from "react";

const BookInfo = ({ book }) => {
  return (
    <div className="flex flex-col items-center justify-center my-4 w-full max-w-2xl bg-yellow-500 rounded-xl p-4">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-center items-center mb-4">
          <div className="w-full md:w-1/2 pr-0 md:pr-2 aspect-[3/4]">
            <img
              src={book.imageA}
              alt="Book cover 1"
              className="rounded-lg shadow-lg w-full h-full object-cover border-2 border-gray-700"
            />
          </div>
          <div className="hidden md:block w-1/2 pl-2 aspect-[3/4]">
            <img
              src={book.imageB}
              alt="Book cover 2"
              className="rounded-lg shadow-lg w-full h-full object-cover border-2 border-gray-700"
            />
          </div>
        </div>
        <div className="w-full rounded-lg p-4">
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center items-center mb-4 gap-2 md:gap-4">
              <span className="font-bold text-base md:text-lg lg:text-xl text-blue-700">
                {book.title}
              </span>
              <span className="font-bold text-base md:text-lg lg:text-xl text-slate-100">
                by {book.author}
              </span>
              <span className="font-bold text-base md:text-lg lg:text-xl text-red-700">
                ({book.publishYear})
              </span>
            </div>
            <div className="mt-4 p-4 border-2 border-gray-400 rounded-lg bg-slate-300">
              <h3 className="font-bold text-sm md:text-base lg:text-lg text-blue-700 mb-2">
                Overview
              </h3>
              <p className="font-cursive text-xs md:text-sm lg:text-base text-gray-800 leading-relaxed">
                {book.bookOverview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
