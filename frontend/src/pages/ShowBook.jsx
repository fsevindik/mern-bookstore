import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import BookInfo from "../components/BookInfo";
import CommentSection from "../components/CommentSection";
import RateModal from "../components/RateModal";
import Spinner from "../components/Spinner";
import AverageIcon from "../components/icons/AverageIcon";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [canComment, setCanComment] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const { id } = useParams();

  // const PORT = "http://localhost:5555"; // this is also saved in config
  const PORT = "https://mern-bookstore-6hsv.onrender.com";

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      try {
        const [bookResponse, ratingResponse] = await Promise.all([
          axios.get(`${PORT}/books/${id}`),
          axios.get(`${PORT}/books/${id}/averageRating`),
        ]);

        setBook(bookResponse.data);
        setComments(bookResponse.data.comments || []);
        setAverageRating(ratingResponse.data.averageRating);
      } catch (error) {
        console.error("Error fetching book data:", error);
        alert("Failed to load book data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  useEffect(() => {
    setCanComment(!!userId);
  }, [userId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to add a comment.");
      return;
    }
    try {
      const response = await axios.post(`${PORT}/books/${id}/comments`, {
        content: newComment,
        userId,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };
  const handleRating = async (rating) => {
    if (!userId) {
      alert("Please log in to rate the book.");
      return;
    }
    try {
      const response = await axios.post(`${PORT}/${id}/rate`, {
        userId,
        rating,
      });
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error rating book:", error);
      alert("Error rating book. Please try again.");
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen p-2 bg-[#1c1a1a] flex flex-col items-center">
      <BackButton />
      <h1 className="text-xl my-2 text-white font-mono">Book Info</h1>

      {book && <BookInfo book={book} />}

      <div className="w-full max-w-2xl border-2 border-black bg-yellow-500 rounded-xl p-4 mt-4">
        <div className="my-2 flex items-center">
          <span className="mr-2 text-gray-900 font-bold sm:text-xs md:text-sm lg:text-md">
            USERS RATING:
          </span>
          <AverageIcon rating={averageRating} />
          <RateModal book={book} onRate={handleRating} />
        </div>
        <CommentSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={handleCommentSubmit}
          canComment={canComment}
          bookId={id}
        />
      </div>
    </div>
  );
};

export default ShowBook;
