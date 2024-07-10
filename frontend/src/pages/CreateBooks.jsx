import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [bookOverview, setBookOverview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      imageA,
      imageB,
      bookOverview,
    };
    setLoading(true);
    axios
      .post("https://mern-bookstore-6hsv.onrender.com/books", data)
      .then(() => {
        setLoading(false);
        toast.error("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error happened. Please check console");

        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-[#332b12]">
      <BackButton />
      <h1 className="text-3xl my-4 text-white text-center">Create a Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">
            Enter related image address initial
          </label>
          <input
            type="url"
            value={imageA}
            onChange={(e) => setImageA(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">
            Enter related image address secondary
          </label>
          <input
            type="url"
            value={imageB}
            onChange={(e) => setImageB(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Book Overview</label>
          <textarea
            value={bookOverview}
            onChange={(e) => setBookOverview(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full h-24"
            placeholder="Write a brief overview of the book..."
          />
        </div>
        <button
          className="p-2 bg-yellow-500  hover:bg-red-600 m-8 rounded-md"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBooks;
