import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import CommentSection from "../components/CommentSection";
import Spinner from "../components/Spinner";
import HeartIcon from "../components/icons/HeartIcon ";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [canComment, setCanComment] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      console.log("Fetching book details for id:", id);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        console.log("Book data fetched:", response.data);
        setBook(response.data);
        setLikes(response.data.likes);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("UserName");
    setCanComment(!!token && !!username);
  }, []);

  const handleLike = async () => {
    setLikeClicked(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/books/${book._id}/like`
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the book:", error);
    }
    setTimeout(() => setLikeClicked(false), 200);
  };

  const handleDislike = async () => {
    setDislikeClicked(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/books/${book._id}/unlike`
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error disliking the book:", error);
    }
    setTimeout(() => setDislikeClicked(false), 200);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5555/books/${book._id}/comments`,
        { text: newComment }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen p-2 bg-[#2a2828] flex flex-col items-center">
      <BackButton />
      <h1 className="text-xl my-2 text-white font-mono">Book Info</h1>

      <div className="flex flex-col md:flex-row items-center md:justify-center md:my-4 w-full max-w-2xl border-2 border-black bg-yellow-500 rounded-xl p-4">
        <img
          src={book.imageA}
          alt="Image 1"
          className="rounded-lg shadow-lg h-auto md:h-80 mb-4 md:mb-0 md:mr-4 md:max-h-80 md:w-auto border-2 border-gray-600"
        />
        <img
          src={book.imageB}
          alt="Image 2"
          className="rounded-lg shadow-lg h-auto md:h-80 md:w-auto border-2 border-gray-600"
        />
      </div>
      <div className="flex flex-col md:flex-row mt-4 w-full max-w-2xl border-2 border-black bg-yellow-500 rounded-xl p-4">
        <div className="flex-grow content-left md:w-2/3">
          <div className="my-2">
            <span className="text-lg mr-2 text-gray-600 font-bold">Title:</span>
            <span className="text-blue-600 font-bold italic text-md">
              {book.title}
            </span>
          </div>
          <div className="my-2">
            <span className="text-lg mr-2 text-gray-600 font-bold">
              Author:
            </span>
            <span className="text-blue-600 font-bold italic text-md">
              {book.author}
            </span>
          </div>
          <div className="my-2">
            <span className="text-lg mr-2 text-gray-600 font-bold">
              Publish Year:
            </span>
            <span className="text-blue-600 font-bold italic text-md">
              {book.publishYear}
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end mt-4 md:mt-0">
          <div className="flex flex-col items-center md:flex-row md:justify-end">
            <div
              className={`border border-gray-500 bg-slate-200 rounded-md m-2 ${
                likeClicked ? "scale-125" : ""
              }`}
              style={{ transition: "transform 200ms" }}
              onClick={handleLike}
            >
              <AiOutlineLike className="text-2xl text-blue-700 hover:text-green-600 cursor-pointer " />
            </div>
            <div
              className={`border border-gray-500 bg-slate-200 rounded-md ${
                dislikeClicked ? "scale-125" : ""
              }`}
              style={{ transition: "transform 200ms" }}
              onClick={handleDislike}
            >
              <AiOutlineDislike className="text-2xl text-red-900 hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl border-2 border-black bg-yellow-500 rounded-xl p-4 mt-4">
        <div className="my-2">
          <span className="text-lg mr-2 text-gray-600 font-bold">
            Create Time:
          </span>
          <span className="text-blue-600 font-bold italic text-md">
            {new Date(book.createdAt).toString()}
          </span>
        </div>
        <div className="my-2">
          <span className="text-lg mr-2 text-gray-600 font-bold">
            Last Update Time:
          </span>
          <span className="text-blue-600 font-bold italic text-md">
            {new Date(book.updatedAt).toString()}
          </span>
        </div>
        <div className="my-2 flex items-center">
          <span className="text-lg mr-2 text-gray-600 font-bold">
            How many people like this book:
          </span>
          <HeartIcon likes={likes} />
        </div>
        <CommentSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={handleCommentSubmit}
          canComment={canComment}
        />
      </div>
    </div>
  );
};

export default ShowBook;
