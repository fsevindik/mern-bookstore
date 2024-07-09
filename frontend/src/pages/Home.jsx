import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import BooksTable from "../components/home/BooksTable";
import TrendingBooks from "../components/tendingBooks/TrendingBooks";
import BooksContext from "../context/BookDb.jsx";
import sliderSettings from "../utils/sliderSettings";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const userStatus = localStorage.getItem("UserRole");

  const { search } = useContext(BooksContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-bookstore-6hsv.onrender.com")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userStatus]);

  const filteredBooks =
    books.length > 0
      ? books.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div className="p-4 bg-[#1c1a1a] flex-grow">
      <TrendingBooks sliderSettings={sliderSettings} />
      <div className="flex justify-center items-center gap-x-4 mb-8"></div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8  mx-auto text-white  font-bold">
          Book List
        </h1>
        {userStatus === "admin" ? (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-yellow-500 text-4xl animate-bounce  hover:scale-110 transition-transform  hover:text-white  mr-4" />
          </Link>
        ) : null}
      </div>
      {/* Conditional rendering based on loading state */}
      {loading ? <div>Loading...</div> : <BooksTable books={filteredBooks} />}
    </div>
  );
};

export default Home;
