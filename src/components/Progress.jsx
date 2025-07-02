import React from "react";

export const Progress = ({ value = 0, max = 100, className = "", ...rest }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`w-full bg-gray-200 rounded-full h-4 overflow-hidden ${className}`}
      {...rest}
    >
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default Progress;
