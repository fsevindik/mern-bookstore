import React from "react";

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  canComment,
}) => {
  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Comments:</h2>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="my-2 p-3 bg-gray-700 rounded-lg border border-gray-600"
        >
          <p className="text-white font-serif">{comment.text}</p>
        </div>
      ))}
      <div className="mt-4 flex">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          disabled={!canComment}
        />
        <button
          type="submit"
          className={`ml-3 px-4 py-2 rounded-full ${
            canComment ? "bg-yellow-600 hover:bg-red-600" : "bg-gray-600"
          } text-white font-semibold`}
          disabled={!canComment}
          onClick={handleCommentSubmit}
        >
          Submit
        </button>
      </div>
      {!canComment && (
        <p className="text-red-500 mt-2">Please log in to add a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
