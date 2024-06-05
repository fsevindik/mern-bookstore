import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import HeartIcon from "../components/icons/HeartIcon ";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLikes(response.data.likes);
        setLoading(false);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    axios
      .get(`http://localhost:5555/books/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

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

  return (
    <div className="min-h-screen p-2 bg-[#F5F5DC] flex flex-col items-center">
      <BackButton />
      <h1 className="text-xl my-2">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-2xl p-4">
          <div className="flex flex-grow flex-row">
            <div className="flex-grow content-left">
              <div className="my-2">
                <span className="text-lg mr-2 text-gray-600 font-bold">Id</span>
                <span>{book._id}</span>
              </div>
              <div className="my-2">
                <span className="text-lg mr-2 text-gray-600 font-bold">
                  Title
                </span>
                <span>{book.title}</span>
              </div>
              <div className="my-2">
                <span className="text-lg mr-2 text-gray-600 font-bold">
                  Author
                </span>
                <span>{book.author}</span>
              </div>
              <div className="my-2">
                <span className="text-lg mr-2 text-gray-600 font-bold">
                  Publish Year
                </span>
                <span>{book.publishYear}</span>
              </div>
            </div>
            <div className="w-6 icons-right">
              <div
                className={`border border-gray-500 bg-slate-200 rounded-md mb-1 ${
                  likeClicked ? "scale-125" : ""
                }`}
                style={{ transition: "transform 200ms" }}
                onClick={handleLike}
              >
                <AiOutlineLike className="text-2xl text-blue-700 hover:text-green-600 cursor-pointer" />
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
          <div className="my-2">
            <span className="text-lg mr-2 text-gray-600 font-bold">
              Create Time
            </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-2">
            <span className="text-lg mr-2 text-gray-600 font-bold">
              Last Update Time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <div className="my-2 flex items-center">
            <span className="text-lg mr-2 text-gray-600 font-bold">
              How many people like this book
            </span>
            <HeartIcon likes={likes} />
          </div>
          <div className="my-2">
            <h2 className="text-xl mb-2">Comments</h2>
            {comments.map((comment) => (
              <div key={comment._id} className="mb-2 p-2 border rounded">
                <p>{comment.text}</p>
                <span className="text-sm text-gray-600">
                  {new Date(comment.createdAt).toString()}
                </span>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-2">
              <textarea
                className="w-full p-1 border rounded"
                rows="2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
              <button
                type="submit"
                className="mt-1 p-1 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
