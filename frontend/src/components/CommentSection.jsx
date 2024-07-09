import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  canComment,
  bookId,
}) => {
  const [charCount, setCharCount] = useState(222);
  const [reactionCounts, setReactionCounts] = useState({});

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const promises = comments.map((comment) =>
          axios.get(
            `https://mern-bookstore-6hsv.onrender.com/reactions/${bookId}/comments/${comment._id}/getreactions`
          )
        );
        const responses = await Promise.all(promises);
        const counts = responses.reduce((acc, response, index) => {
          acc[comments[index]._id] = response.data;
          return acc;
        }, {});
        setReactionCounts(counts);
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [comments, bookId]);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 222) {
      setNewComment(value);
      setCharCount(222 - value.length);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const userId = localStorage.getItem("userId");
      const reactionType = "like";
      if (
        reactionCounts[commentId]?.like &&
        reactionCounts[commentId]?.usersLiked.includes(userId)
      ) {
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [commentId]: {
            ...prevCounts[commentId],
            like: prevCounts[commentId].like - 1,
            usersLiked: prevCounts[commentId].usersLiked.filter(
              (id) => id !== userId
            ),
          },
        }));
      } else {
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [commentId]: {
            ...prevCounts[commentId],
            like: (prevCounts[commentId]?.like || 0) + 1,
            usersLiked: [...(prevCounts[commentId]?.usersLiked || []), userId],
          },
        }));
      }

      const response = await axios.post(
        `https://mern-bookstore-6hsv.onrender.com/reactions/${bookId}/comments/${commentId}/postreactions`,
        {
          userId,
          reactionType,
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [commentId]: {
            ...prevCounts[commentId],
            like: (prevCounts[commentId]?.like || 1) - 1,
          },
        }));
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [commentId]: {
          ...prevCounts[commentId],
          like: (prevCounts[commentId]?.like || 1) - 1,
        },
      }));
    }
  };

  const userId = localStorage.getItem("userId");

  return (
    <div className="my-4 bg-gray-800 p-2 sm:p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">
        User Opinions:
      </h2>
      <div className="w-full">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex flex-col sm:flex-row p-2 sm:p-2 bg-gray-700 rounded-lg border border-gray-600 mb-2 sm:mb-4"
          >
            <div
              className={`${
                !userId ? "cursor-not-allowed" : "cursor-pointer"
              } mb-2 sm:mb-0`}
            >
              <FaThumbsUp
                className={`text-yellow-400 hover:text-blue-700 ${
                  !userId ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={!userId ? null : () => handleLike(comment._id)}
                style={!userId ? { pointerEvents: "none" } : {}}
              />
              <span className="text-yellow-400 font-medium ml-1">
                {reactionCounts[comment._id]?.like || 0}
              </span>
            </div>
            <div className="flex-1 ml-0 sm:ml-2">
              <div className="border border-yellow-400 rounded-md bg-slate-300 p-2 relative">
                <p className="text-gray-800 font-mono break-all whitespace-normal overflow-wrap-anywhere word-break-break-word hyphens-auto max-h-24 overflow-y-auto">
                  {comment.text}
                </p>
                <span className="text-blue-600 font-serif text-xs italic">
                  〰{comment.userName}〰
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          disabled={!canComment}
        />
        <div className="flex justify-end">
          <p className="text-gray-400 mt-1 mr-2">{charCount} characters left</p>
          <button
            type="submit"
            className={`px-4 py-2 rounded-full cursor-pointer ${
              canComment ? "bg-yellow-600 hover:bg-red-600" : "bg-gray-600"
            } text-white font-semibold`}
            disabled={!canComment || newComment.trim().length === 0}
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {!canComment && (
        <p className="text-red-500 mt-2 font-sans">
          ❗️Register to leave a comment, rate a book or like comments.
        </p>
      )}
    </div>
  );
};

export default CommentSection;
