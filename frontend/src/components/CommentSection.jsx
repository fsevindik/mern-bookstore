import React from "react";

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  canComment,
  username,
}) => {
  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-white mb-4">Comments:</h2>
      <div className="w-full">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="my-2 p-3 bg-gray-700 rounded-lg border border-gray-600 w-full flex items-start"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGNwF755s1ARjqzzzBTcXBQtZUOKi_-_6RKj9sgvsY4J9CBw1Zzy6eTkVezzQ_9ivhDvc&usqp=CAU"
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex-1">
              <p className="text-white font-serif text-sm">
                <span className="font-semibold text-blue-500 text-sm">
                  {comment.userName}{" "}
                </span>
                says that
              </p>
              <div className="border border-cyan-400 rounded-md ml-4 bg-slate-300 max-w-full">
                <p className="text-gray-800 font-mono ml-2 break-all whitespace-normal overflow-wrap-anywhere word-break-break-word hyphens-auto max-h-32 overflow-y-auto p-2">
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full">
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
