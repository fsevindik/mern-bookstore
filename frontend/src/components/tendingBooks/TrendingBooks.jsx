import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Spinner from "../Spinner";

const TrendingBooks = ({ sliderSettings }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        const allBooks = response.data.data;
        const trendingBooks = allBooks
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 5);
        setBooks(trendingBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const truncateAuthor = (author, maxLength) => {
    if (author.length > maxLength) {
      return `${author.substring(0, maxLength)}...`;
    }
    return author;
  };

  return (
    <div className="my-8 mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        Some of Trending Books
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <Slider {...sliderSettings}>
          {books.map((book) => (
            <Link key={book._id} to={`/books/details/${book._id}`}>
              <div className="px-2">
                <div className="bg-[#f5c518] p-4 rounded-lg shadow-md flex cursor-pointer">
                  <div className="w-full">
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{ paddingTop: "150%" }}
                    >
                      <img
                        src={book.imageA}
                        alt={book.title}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-center">{book.title}</h3>
                    <p className="text-blue-600 mt-2 text-center font-bold">
                      Author:{" "}
                      <span className="text-white font-serif">
                        {truncateAuthor(book.author, 15)}
                      </span>
                    </p>
                    <p className="mt-2 text-blue-700 font-bold text-center">
                      Rating:{" "}
                      <span className="text-white font-serif">
                        {book.likes}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrendingBooks;
