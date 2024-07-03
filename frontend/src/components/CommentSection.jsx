import React, { useState } from "react";

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  canComment,
}) => {
  const [charCount, setCharCount] = useState(200);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 222) {
      setNewComment(value);
      setCharCount(200 - value.length);
    }
  };

  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-white mb-4">User Opinions:</h2>
      <div className="w-full">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="p-2 bg-gray-700 rounded-lg border border-gray-600 w-full flex flex-col"
          >
            <div className="border border-yellow-400 rounded-md bg-slate-100 max-w-full p-2 relative">
              <p className="text-gray-800 font-mono break-all whitespace-normal overflow-wrap-anywhere word-break-break-word hyphens-auto max-h-32 overflow-y-auto">
                {comment.text}
              </p>
              <div className="absolute bottom-0 right-0">
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
