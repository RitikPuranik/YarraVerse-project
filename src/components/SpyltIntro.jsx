import React, { useEffect } from "react";

const SpyltIntro = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Show for 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <h1 className="text-6xl font-bold text-white tracking-widest animate-pulse relative">
        <span className="text-[#ff5f00] drop-shadow-[0_0_25px_#ff5f00]">
          YATRA
        </span>
        <span className="text-[#fff] drop-shadow-[0_0_20px_#ffffffaa] ml-1">
          VERSE
        </span>
      </h1>
    </div>
  );
};

export default SpyltIntro;
