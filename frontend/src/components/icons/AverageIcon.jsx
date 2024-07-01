import React from "react";

const AverageIcon = ({ rating }) => {
  return (
    <div className="border-2 border-gray-300 p-1 rounded-md bg-gray-400">
      <span className="text-bold m-1">⭐️</span>
      <span className="font-bold">{rating}</span>
    </div>
  );
};

export default AverageIcon;
