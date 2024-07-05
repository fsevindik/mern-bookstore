import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Trends = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const PORT = "http://localhost:5555";

  useEffect(() => {
    axios
      .get(`${PORT}/books`)
      .then(async (response) => {
        const allBooks = response.data.data;
        const trendingBooks = allBooks
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 6);

        const booksWithRatings = await Promise.all(
          trendingBooks.map(async (book) => {
            const ratingResponse = await axios.get(
              `${PORT}/books/${book._id}/averageRating`
            );
            return {
              ...book,
              averageRating: ratingResponse.data.averageRating,
            };
          })
        );

        setBooks(booksWithRatings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="bg-[#1c1a1a] flex flex-grow flex-col items-center justify-center">
      <div className="mx-auto mt-5"></div>
      <div className="flex-grow w-full my-8 mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Trending Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Link key={book._id} to={`/books/details/${book._id}`}>
              <div className="bg-yellow-500 p-4 rounded-lg shadow-md flex flex-col cursor-pointer">
                <div className="relative pb-[95%] overflow-hidden rounded-lg">
                  <img
                    src={book.imageA}
                    alt={book.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-blue-600 font-bold text-center md:text-md text-sm mb-1">
                      <span className="text-white font-serif">
                        {truncateText(book.author, 20)}
                      </span>
                    </p>
                    <h3 className="font-semibold text-center md:text-md">
                      {truncateText(book.title, 30)}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <FaStar className="text-blue-500 mr-1 text-sm" />
                    <span className="text-white text-xs font-bold">
                      {book.averageRating
                        ? book.averageRating.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trends;
