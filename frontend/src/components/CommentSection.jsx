import React from "react";

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
}) => {
  const charLimit = 200;
  const charsLeft = charLimit - newComment.length;

  return (
    <div className="my-4">
      <h2 className="text-md mb-4 text-center font-serif">Some Review</h2>
      {comments.length === 0 ? (
        <p className="text-center italic">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-4 p-4 border rounded bg-gray-100 relative"
          >
            <p className="italic">{comment.text}</p>
            <div className="absolute bottom-2 right-2 text-xs text-gray-600">
              Posted On:{" "}
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded resize-none"
          rows="2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          maxLength={charLimit}
        ></textarea>
        <div className="text-right text-sm mt-1">
          {charsLeft <= 0 ? (
            <span className="text-red-600">Character limit reached!</span>
          ) : (
            <span>{charsLeft} characters left</span>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
