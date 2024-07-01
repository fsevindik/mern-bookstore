import React from "react";

const AverageIcon = ({ rating }) => {
  return (
    <div style={{ display: "inline-block", fontSize: "1.2rem" }}>
      <span style={{ marginRight: "0.5rem" }}>⭐️</span>
      <span>{rating}</span>
    </div>
  );
};

export default AverageIcon;
