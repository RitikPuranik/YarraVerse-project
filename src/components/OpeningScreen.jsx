// src/components/OpeningScreen.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const OpeningScreen = ({ onFinish }) => {
  const [stage, setStage] = useState("initial");
  const [typedText, setTypedText] = useState("");
  const [typedParagraph, setTypedParagraph] = useState("");

  const containerControls = useAnimation();

  const fullTitle = "YatraVerse";
  const fullParagraph =
    "Enter realms where ancient spirituality converges with immersive technology. Our digital sanctuaries offer transformative journeys bridging timeless wisdom with modern exploration.";

  const logoControls = useAnimation();
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const paragraphControls = useAnimation();




// 👇 Add scroll locking here
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

// Then continue with the rest...
useEffect(() => {
  const timer1 = setTimeout(() => setStage("logo"), 1500);
  return () => clearTimeout(timer1);
}, []);


  useEffect(() => {
    if (stage === "logo") {
      logoControls.start({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 1.8, ease: "easeInOut" },
      });
      const timer2 = setTimeout(() => setStage("typewriter"), 1800);
      return () => clearTimeout(timer2);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "typewriter") {
      let i = 0;
      const typing = setInterval(() => {
        setTypedText(fullTitle.slice(0, i + 1));
        i++;
        if (i === fullTitle.length) {
          clearInterval(typing);
          setTimeout(() => setStage("moveLeft"), 500);
        }
      }, 150);
      return () => clearInterval(typing);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "moveLeft") {
      const distance = window.innerWidth / 2 - 40 - 180;

      logoControls.start({
        x: -distance,
        rotate: -360,
        transition: { duration: 2, ease: "easeInOut" },
      });

      titleControls.start({
        x: -distance,
        transition: { duration: 2, ease: "easeInOut" },
      });

      subtitleControls.start({
        x: -distance,
        transition: { duration: 2, ease: "easeInOut" },
      });

      setTimeout(() => setStage("paragraph"), 2000);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "paragraph") {
      paragraphControls.start({ opacity: 1, scale: 1, x: 0 });
      let i = 0;
      const typing = setInterval(() => {
        setTypedParagraph(fullParagraph.slice(0, i + 1));
        i++;
        if (i === fullParagraph.length) {
          clearInterval(typing);
          setTimeout(() => setStage("logoReturn"), 2000);
        }
      }, 15);
      return () => clearInterval(typing);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "logoReturn") {
      logoControls.start({
        x: 0,
        rotate: 360,
        transition: { duration: 2, ease: "easeInOut" },
      });

      titleControls.start({
        x: 0,
        transition: { duration: 2, ease: "easeInOut" },
      });

      subtitleControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 2, ease: "easeInOut" },
      });

      paragraphControls.start({
        opacity: 0,
        scale: 0.2,
        x: 200,
        // y: -60,
        transition: { duration: 2, ease: "easeIn" },
      });

      setTimeout(() => setStage("enlargeLogo"), 2200);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "enlargeLogo") {
      logoControls.start({
        scale: 50,
        rotate: 0,
        transition: { duration: 1.5, ease: "easeInOut" },
      });

      titleControls.start({
        x: 0,
        opacity:0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      subtitleControls.start({
        x: 0,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      setTimeout(() => setStage("shrinkAndExit"), 1800);
    }
  }, [stage]);

useEffect(() => {
  if (stage === "shrinkAndExit") {
    logoControls.start({
      scale: 0,
      rotate: 720,
      transition: { duration: 1.2, ease: "easeInOut" },
    });

    containerControls.start({
      opacity: 0,
      transition: { duration: 1.2, ease: "easeInOut" },
    });

    setTimeout(() => {
      // ✅ Reset scroll state explicitly before finishing
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0); // optional: force scroll to top

      if (onFinish) onFinish();
    }, 1300); // after fade-out ends
  }
}, [stage]);


  return (
    <motion.div 
    key="opening"
  className="h-screen w-screen bg-gradient-to-br from-[#2b1205] to-black flex items-center justify-center overflow-hidden relative"
  initial={{ opacity: 1 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={logoControls}
          className="w-28 h-28 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,165,0,0.7)] mb-6"
        >
          <span className="text-5xl">🔱</span>
        </motion.div>

        <motion.h1
          initial={{ x: 0 }}
          animate={titleControls}
          className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent tracking-wider"
        >
          {typedText}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 0 }}
          animate={subtitleControls}
          className="text-sm text-amber-300 italic mt-2"
        >
          Your sacred digital pilgrimage
        </motion.p>
      </div>

      {/* Paragraph */}
      <motion.div
        initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
        animate={paragraphControls}
        className="absolute top-1/3 right-20 w-[40%]"
      >
        <div className="bg-black/40 p-6 rounded-xl border border-amber-800/30 backdrop-blur-sm">
          <p className="text-orange-200 leading-relaxed text-lg">
            {typedParagraph}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OpeningScreen;
