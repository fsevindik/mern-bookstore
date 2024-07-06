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
  const [charCount, setCharCount] = useState(200);
  const [likedComments, setLikedComments] = useState([]);
  const [reactionCounts, setReactionCounts] = useState(0);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const promises = comments.map((comment) =>
          axios.get(
            `http://localhost:5555/${bookId}/comments/${comment._id}/getreactions`
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
      setCharCount(200 - value.length);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const userId = localStorage.getItem("userId");
      const reactionType = "like";
      const response = await axios.post(
        `http://localhost:5555/${bookId}/comments/${commentId}/postreactions`,
        {
          userId,
          reactionType,
        }
      );

      if (response.status === 201) {
        setLikedComments([...likedComments, commentId]);
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [commentId]: {
            ...prevCounts[commentId],
            like: (prevCounts[commentId]?.like || 0) + 1,
          },
        }));
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-white mb-4">User Opinions:</h2>
      <div className="w-full">
        {comments.map((comment, index) => (
          <div
            key={index}
            className=" flexp-2 bg-gray-700 rounded-lg border border-gray-600 w-full flex flex-col"
          >
            <div className="border border-yellow-400 rounded-md bg-slate-200 max-w-full p-2 relative flex items-center justify-between">
              <div className=" flex space-x-1 cursor-pointer m-1">
                <FaThumbsUp
                  className="text-blue-400 size-6 hover:text-blue-700"
                  onClick={() => handleLike(comment._id)}
                />
                <span className="tetx-blue-800 font-medium">
                  {reactionCounts[comment._id]?.like > 0 && (
                    <span className="text-gray-600">
                      {reactionCounts[comment._id]?.like}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                {reactionCounts[comment._id]?.like > 0 && (
                  <span className="ml-1 text-gray-600">
                    {reactionCounts[comment._id]?.like}
                  </span>
                )}
                <p className="ml- text-gray-800 font-mono break-all whitespace-normal overflow-wrap-anywhere word-break-break-word hyphens-auto max-h-32 overflow-y-auto">
                  {comment.text}
                </p>
              </div>
              <span className="text-blue-600 font-serif text-xs italic mt-auto">
                〰{comment.userName}〰
              </span>
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
            className={`px-4 py-2 rounded-full ${
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
        <p className="text-red-500 mt-2">You need to log in to comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
