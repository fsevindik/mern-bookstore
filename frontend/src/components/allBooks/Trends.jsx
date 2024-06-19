import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";
import Spinner from "../Spinner";

const Trends = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        const allBooks = response.data.data;
        const trendingBooks = allBooks
          .filter((book) => book.likes > 0)
          .sort((a, b) => b.likes - a.likes);
        setBooks(trendingBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#2a2828]  flex flex-grow flex-col items-center justify-center">
      <div className="mx-auto mt-5">
        <BackButton />
      </div>
      <div className="flex-grow w-full h-full my-8 mx-auto max-w-5xl px-4 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Trending Books
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-yellow-400 p-4 rounded-lg shadow-md flex flex-col sm:flex-row relative"
              >
                <img
                  src={
                    "https://assets-prd.ignimgs.com/2023/05/06/the-best-selling-books-of-all-time-1-1683340164219.jpg"
                  }
                  alt={book.title}
                  className="w-full sm:w-1/2 h-40 object-cover mb-4 sm:mb-0 rounded-lg"
                />
                <div className="flex-grow flex flex-col text-left p-2 sm:w-1/2">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-blue-600  mt-2 text-left font-bold ">
                    Author:{" "}
                    <span className="text-white font-serif">{book.author}</span>
                  </p>
                  <p className="text-blue-600 mt-2  text-left font-bold">
                    Rating:{" "}
                    <span className="text-white font-serif">{book.likes}</span>
                  </p>
                  <p className="text-blue-600  mt-2 text-left font-bold">
                    Price: <span className="text-white font-serif">$9.99</span>
                  </p>

                  <Link
                    to={`/books/details/${book._id}`}
                    className="mt-4 self-start"
                  >
                    <BiSearch className="text-blue-600 size-5 hover:text-white transition-transform transform  hover:scale-125 " />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
