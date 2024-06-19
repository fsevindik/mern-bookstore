import axios from "axios";
import React, { useEffect, useState } from "react";
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

  return (
    <div className="my-8 mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        {" "}
        Some of Trending Books
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <Slider {...sliderSettings}>
          {books.map((book) => (
            <div key={book._id} className="px-2">
              <div className="bg-[#f5c518] p-1 rounded-lg shadow-md flex">
                <div className="w-full max-h-full">
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"
                    }
                    alt={book.title}
                    className="md:w-3/4 md:h-1/2 sm:h-16 object-cover mb-4 rounded-lg mx-auto"
                  />
                  <h3 className="font-semibold text-center">{book.title}</h3>
                  <p className="text-blue-600  mt-2 text-left font-bold ">
                    Author:{" "}
                    <span className="text-white bold font-serif">
                      {book.author}
                    </span>
                  </p>
                  <p className="mt-2 text-blue-700 font-bold  text-left">
                    Rating:{" "}
                    <span className="text-white bold font-serif">
                      {book.likes}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrendingBooks;
