import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import HeartIcon from "../components/icons/HeartIcon ";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen p-4 bg-[#F5F5DC] flex flex-col items-center">
      <BackButton />
      <h1 className="text-3xl my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-2xl p-6">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">
              Publish Year
            </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">
              Create Time
            </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 font-bold">
              Last Update Time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <div className="my-4 flex items-center">
            <span className="text-xl mr-4 text-gray-600 font-bold">
              How many people like this book
            </span>
            {/* <FaHeart color="green" size={24} /> */}
            {/* <span className="text-xl ml-2">{book.likes}</span> */}
            <HeartIcon likes={book.likes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
