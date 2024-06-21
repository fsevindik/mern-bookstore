import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [relatedImageA, setRelatedImageA] = useState("");
  const [relatedImageB, setRelatedImageB] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { author, publishYear, title, imageA, imageB } = response.data;
        setAuthor(author);
        setPublishYear(publishYear);
        setTitle(title);
        setRelatedImageA(imageA || "");
        setRelatedImageB(imageB || "");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to fetch book details", { variant: "error" });
        console.error("Error fetching book:", error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = { title, author, publishYear, relatedImageA, relatedImageB };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to edit book", { variant: "error" });
        console.error("Error editing book:", error);
      });
  };

  return (
    <div className="p-4 bg-[#28223180] flex-grow items-center justify-center">
      <BackButton />
      <h1 className="text-3xl my-4 text-center font-bold">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 bg-slate-100 border-yellow-600 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Related Image Address A
          </label>
          <input
            type="url"
            value={relatedImageA}
            placeholder="Enter image address 1"
            onChange={(e) => setRelatedImageA(e.target.value || "")}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Related Image Address B
          </label>
          <input
            type="url"
            value={relatedImageB}
            placeholder="Enter image adress 2"
            onChange={(e) => setRelatedImageB(e.target.value || "")}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 hover:bg-yellow-500"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
