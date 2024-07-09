import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Spinner from "../Spinner";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const PORT = "https://mern-bookstore-6hsv.onrender.com";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${PORT}/books`)
      .then(async (response) => {
        const allBooks = response.data.data;
        const trendingBooks = allBooks.slice(0, 10);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="my-8 mx-auto max-w-[85%]  px-4">
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
                <div className="bg-yellow-500 p-3 rounded-lg shadow-md flex flex-col cursor-pointer lg:h-[280px]">
                  <div className="relative pb-[85%] mx-[15%]  overflow-hidden rounded-lg">
                    <img
                      src={book.imageA}
                      alt={book.title}
                      className="absolute top-0 left-0 w-full h-full md:object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-2 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-blue-600 text-center font-bold md:text-md  text-sm mb-1">
                        <span className="text-white font-serif font-bold ">
                          {truncateText(book.author, 20)}
                        </span>
                      </p>
                      <h3 className="font-semibold text-center md:text-md ">
                        {truncateText(book.title, 20)}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <FaStar className="text-blue-500 mr-1 text-xs" />
                      <span className="text-white lg:text-lg  sm:text-xs font-bold">
                        {book.averageRating
                          ? book.averageRating.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}
      <style jsx>{`
        .custom-dots li button:before {
          color: white !important;
        }
        .custom-dots li.slick-active button:before {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default TrendingBooks;
