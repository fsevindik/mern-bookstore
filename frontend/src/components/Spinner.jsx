import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="animate-spin w-20 h-20 border-4 border-t-4 border-t-transparent border-red-500 rounded-full text-yellow-500"
        aria-label="Loading"
      >
        Loading
      </div>
    </div>
  );
};

export default Spinner;
