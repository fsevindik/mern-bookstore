import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import TrendingBooks from "../components/tendingBooks/TrendingBooks";
import sliderSettings from "../utils/sliderSettings";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const userStatus = localStorage.getItem("UserRole");

  useEffect(() => {
    console.log("User Role:", userStatus);
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userStatus]);

  return (
    <div className="p-4 bg-[#343131] flex-grow">
      <TrendingBooks sliderSettings={sliderSettings} />
      <div className="flex justify-center items-center gap-x-4 mb-8">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8  mx-auto text-white  font-bold">
          Book List
        </h1>
        {userStatus === "admin" ? (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-yellow-500 text-4xl hover:scale-110 transition-transform  hover:text-white " />
          </Link>
        ) : null}
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
