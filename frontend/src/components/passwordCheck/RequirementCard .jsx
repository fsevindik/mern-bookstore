import React from "react";
import { FaCheckCircle, FaDotCircle } from "react-icons/fa";

const RequirementCard = ({ text, hasPassed }) => {
  const color = hasPassed ? "text-green-500" : "text-red-500";
  const IconComponent = hasPassed ? FaCheckCircle : FaDotCircle;

  return (
    <div className="flex items-center">
      <IconComponent className={`text-lg ${color} mr-2`} />
      <p className={`text-sm ${color}`}>{text}</p>
    </div>
  );
};

export default RequirementCard;
