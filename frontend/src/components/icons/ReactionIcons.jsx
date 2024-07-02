import React from "react";

const ReactionIcons = ({ onReact }) => (
  <div className="flex space-x-2 mb-1 mr-auto  z-10">
    <button
      onClick={() => onReact("like")}
      className="reaction-button text-sm bg-gray-500 rounded-md hover:scale-125 hover:bg-blue-500"
    >
      👍
    </button>
    <button
      onClick={() => onReact("heart")}
      className="reaction-button text-sm bg-gray-500 rounded-md hover:scale-125 hover:bg-blue-500"
    >
      ❤️
    </button>
    <button
      onClick={() => onReact("smile")}
      className="reaction-button text-sm bg-gray-500 rounded-md hover:scale-125 hover:bg-blue-500"
    >
      😊
    </button>
    <button
      onClick={() => onReact("surprise")}
      className=" text-sm bg-gray-500 rounded-md hover:scale-125 hover:bg-blue-500"
    >
      👏
    </button>
  </div>
);

export default ReactionIcons;
