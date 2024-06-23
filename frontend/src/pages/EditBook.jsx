import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setImageA(book.imageA);
        setImageB(book.imageB);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdateBook = async () => {
    const data = {
      title,
      author,
      publishYear,
      imageA,
      imageB,
    };

    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      enqueueSnackbar("Book updated successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error editing book:", error);
      enqueueSnackbar("Error updating book", { variant: "error" });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 bg-[#F5F5DC]">
      <h1 className="text-3xl my-4">Edit Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Enter related image address (initial)
          </label>
          <input
            type="url"
            value={imageA}
            onChange={(e) => setImageA(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Enter related image address (secondary)
          </label>
          <input
            type="url"
            value={imageB}
            onChange={(e) => setImageB(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
