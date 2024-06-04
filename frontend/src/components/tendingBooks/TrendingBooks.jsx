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
            <div key={book.id} className="px-2  ">
              <div className="bg-red-300 p-4 rounded-lg shadow-md flex">
                <div className=" w-1/2">
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"
                    }
                    alt={book.title}
                    className="w-1/3 h-auto sm:h-16  object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-blue-600 bold mt-2">
                    Author :{"  "}
                    <span className="text-white bold font-serif">
                      {book.author}
                    </span>
                  </p>
                  <p className="mt-2 text-blue-600 bold  ">
                    Rating:{"  "}
                    <span className="text-white bold font-serif">
                      {book.likes}{" "}
                    </span>
                  </p>
                  <p className="mt-2 text-blue-600 bold ">
                    Price:{"  "}
                    <span className="text-white bold font-serif">$9.99</span>
                  </p>
                </div>
                <div className=" w-1/2 border-2 border-black">
                  <p>To Do :</p>
                  <p>here will be comments</p>
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
