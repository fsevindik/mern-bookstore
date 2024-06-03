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
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-4">Trending Books</h2>
      {loading ? (
        <Spinner />
      ) : (
        <Slider {...sliderSettings}>
          {books.map((book) => (
            <div key={book.id} className="px-2">
              <div className="bg-red-300 p-4 rounded-lg shadow-md">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-auto sm:h-64 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="mt-2">Rating: {book.likes}</p>
                <p className="mt-2">Price: $9.99</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrendingBooks;
