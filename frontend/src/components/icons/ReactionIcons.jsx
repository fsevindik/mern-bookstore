import React from "react";

const ReactionIcons = ({ onReact }) => (
  <div className="flex space-x-2 mt-1">
    <button
      onClick={() => onReact("like")}
      className="reaction-button text-sm bg-gray-500 rounded-md"
    >
      👍
    </button>
    <button
      onClick={() => onReact("heart")}
      className="reaction-button text-sm bg-gray-500 rounded-md"
    >
      ❤️
    </button>
    <button
      onClick={() => onReact("smile")}
      className="reaction-button text-sm bg-gray-500 rounded-md"
    >
      😊
    </button>
    <button
      onClick={() => onReact("surprise")}
      className=" text-sm bg-gray-500 rounded-md"
    >
      👏
    </button>
  </div>
);

export default ReactionIcons;
