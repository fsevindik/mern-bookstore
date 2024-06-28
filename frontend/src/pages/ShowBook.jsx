import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import BookInfo from "../components/BookInfo";
import CommentSection from "../components/CommentSection";
import RateModal from "../components/RateModal";
import Spinner from "../components/Spinner";
import HeartIcon from "../components/icons/HeartIcon ";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [canComment, setCanComment] = useState(false);
  const { id } = useParams();

  const username = localStorage.getItem("UserName");

  useEffect(() => {
    const fetchBook = async () => {
      console.log("Fetching book details for id:", id);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        console.log("Book data fetched:", response.data);
        setBook(response.data);
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
    setCanComment(!!token && !!username);
  }, [username]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User is not logged in");
      alert("Please log in to add a comment.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5555/books/${book._id}/comments`,
        { text: newComment, userId }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen p-2 bg-[#2a2828] flex flex-col items-center">
      <BackButton />
      <h1 className="text-xl my-2 text-white font-mono">Book Info</h1>

      {book && <BookInfo book={book} />}

      <div className="w-full max-w-2xl border-2 border-black bg-yellow-500 rounded-xl p-4 mt-4">
        <div className="my-2 flex items-center">
          <span className="text-lg mr-2 text-gray-600 font-bold">
            How many people like this book:
          </span>
          <HeartIcon likes={book.likes} />
          <RateModal />
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
