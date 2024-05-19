import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="animate-spin w-16 h-16 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full"
        aria-label="Loading"
      >
        Loading
      </div>
    </div>
  );
};

export default Spinner;
