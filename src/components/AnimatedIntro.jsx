// src/components/AnimatedIntro.jsx
import React, { useEffect } from "react";

const AnimatedIntro = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-[#FFA500]">
  <h1
    className="text-[70px] md:text-[100px] font-extrabold font-[Orbitron,sans-serif] tracking-wider glow animate-zoom-out"
  >
    YatraVerse
  </h1>
</div>

  );
};

export default AnimatedIntro;
