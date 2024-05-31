import React from "react";

const HeartIcon = ({ likes }) => {
  return (
    <div style={{ position: "relative" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="32" // Increased width to make the heart icon bigger
        height="32" // Increased height to make the heart icon bigger
        className="text-green-500 border-2 border-collapse rounded-md"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1rem", // Increased font size to make the text bigger
          color: "white",
          fontWeight: "bold",
        }}
      >
        {likes}
      </span>
    </div>
  );
};

export default HeartIcon;
