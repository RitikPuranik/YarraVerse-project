// src/pages/Index.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaLeaf,
  FaRobot,
  FaCubes,
  FaGem,
  FaHeartbeat,
  FaGlobeAsia,
  FaMicrophone,
  FaPhone,
  FaGooglePlay,
  FaApple,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
const Index = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = () => {
    if (!question.trim()) return;
    // Simulated response for now
    setAnswer(`🕉️ "${question}" is a sacred query. Guidance shall come.`);
    setQuestion("");
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setAnswer(`🕉️ "${transcript}" is a sacred query. Guidance shall come.`);
    };

    recognition.onerror = (e) => {
      alert("Voice recognition error. Try again.");
    };

    recognition.start();
  };

  return (
    <>
      {/* Features Section */}
      <section className="bg-[#3d1d00] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Experience the Sacred, Virtually</h2>
          <p className="text-gray-300 text-lg">
            Discover how technology enhances your spiritual journey
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          {[
            {
              icon: <FaMapMarkerAlt className="text-[#FF5F00] text-4xl mb-4 mx-auto" />,
              title: "Scan Sacred Sites",
              desc: "Use AR to discover temples, statues, and rituals near you.",
              hoverClass: "hover:ring-[#FF5F00] hover:ring-2 hover:bg-[#5e2a00] cursor-pointer",
              link: "",
            },
            {
              icon: <FaGem className="text-[#00D26A] text-4xl mb-4 mx-auto" />,
              title: "Earn Karma Points",
              desc: "Make eco-friendly choices and grow spiritually as you travel.",
              hoverClass: "hover:ring-[#00D26A] hover:ring-2 hover:bg-[#005f3c] cursor-pointer",
              link: "",
            },
            {
              icon: <FaRobot className="text-[#FFD900] text-4xl mb-4 mx-auto" />,
              title: "Smart Rituals",
              desc: "Ask our AI assistant about mantras, offerings, and yatra tips.",
              hoverClass: "hover:ring-[#FFD900] hover:ring-2 hover:bg-[#665100] cursor-pointer",
              link: "",
            },
            {
              icon: <FaLeaf className="text-[#00D26A] text-4xl mb-4 mx-auto" />,
              title: "Eco Tracker",
              desc: "Track your eco footprint during your spiritual journeys.",
              hoverClass: "hover:ring-[#00D26A] hover:ring-2 hover:bg-[#005f3c] cursor-pointer",
              link: "/eco-tracker",
            },
            {
              icon: <FaHeartbeat className="text-[#FFD900] text-4xl mb-4 mx-auto" />,
              title: "Spiritual Tracker",
              desc: "Monitor meditation, devotion, and ritual consistency and spiritual growth.",
              hoverClass: "hover:ring-[#FFD900] hover:ring-2 hover:bg-[#665100] cursor-pointer",
              link: "/spiritual-dashboard",
            },
            {
              icon: <FaGlobeAsia className="text-[#FF5F00] text-4xl mb-4 mx-auto" />,
              title: "Virtual Yatra",
              desc: "Embark on immersive 360° pilgrimages across India's sacred sites from anywhere.",
              hoverClass: "hover:bg-[#5e2a00] hover:ring-2 hover:ring-[#FF5F00] cursor-pointer",
              link: "/virtual-pilgrimage",
            },
            {
              icon: <FaRobot className="text-[#FFD900] text-4xl mb-4 mx-auto" />,
              title: "Smart Assistant",
              desc: "Get real-time answers to spiritual questions, rituals, and history using AI.",
              hoverClass: "hover:bg-[#665100] hover:ring-2 hover:ring-[#FFD900] cursor-pointer",
              link: "/smart-assistant",
            },
            {
              icon: <FaCubes className="text-[#00D26A] text-4xl mb-4 mx-auto" />,
              title: "AR Dharma Quest",
              desc: "Unlock challenges and teachings via augmented reality missions during yatras.",
              hoverClass: "hover:bg-[#005f3c] hover:ring-2 hover:ring-[#00D26A] cursor-pointer",
              link: "/ar-quest",
            },
          ].map(({ icon, title, desc, hoverClass, link }, i) => {
            const cardContent = (
              <div
                className={`bg-[#472100] p-6 rounded-xl shadow transition hover:shadow-2xl hover:-translate-y-1 ${hoverClass}`}
              >
                {icon}
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            );

            return link ? (
              <Link to={link} key={i}>
                {cardContent}
              </Link>
            ) : (
              <div key={i}>{cardContent}</div>
            );
          })}
        </div>
      </section>

      {/* Voice of Gods Section */}
      <section className="bg-gradient-to-b from-[#4a2600] to-[#3d1d00] py-20 px-4 text-white">
        <div className="max-w-xl mx-auto text-center bg-[#5e2a00] p-10 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Voice of the Gods - Ask Me Anything</h2>
          <p className="mb-6 text-gray-300">About rituals, mythology, or pilgrimage guidance</p>
          <div className="flex items-center border border-yellow-500 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
          <div
            onClick={handleVoiceInput}
            className="px-4 text-yellow-400 animate-pulse cursor-pointer"
            title="Tap to speak"
          >
            <FaMicrophone />
          </div>
          <input
            type="text"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
          />
          <button
            onClick={handleAsk}
            className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-500 transition-colors"
          >
            →
          </button>
        </div>

        {answer && (
          <div className="mt-6 text-yellow-300 text-center font-semibold animate-fade-in">
            {answer}
          </div>
        )}

          <div className="mt-4 flex justify-center gap-8 text-yellow-300">
            <button className="flex items-center gap-2 hover:text-yellow-100 transition-transform hover:scale-110">
              <FaMicrophone /> Voice Input
            </button>
            <button className="flex items-center gap-2 hover:text-yellow-100 transition-transform hover:scale-110">
              <FaPhone /> Call Priest
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0c23] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white rounded-full w-10 h-10" />
              <h3 className="text-xl font-semibold">YatraVerse</h3>
            </div>
            <p className="text-gray-400">Walk with faith. Travel with tech. Heal the planet.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="text-gray-400 space-y-1">
              <li>Virtual Yatra</li>
              <li>Smart Assistant</li>
              <li>AR Dharma Quest</li>
              <li>EcoYatri</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul className="text-gray-400 space-y-1">
              <li>Help Center</li>
              <li>Safety</li>
              <li>Community</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Download App</h4>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                <FaGooglePlay /> Google Play
              </button>
              <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                <FaApple /> App Store
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 flex justify-between items-center border-t border-gray-700 pt-6 text-gray-400 text-sm">
          <span>© 2025 YatraVerse. All rights reserved.</span>
          <div className="flex gap-4">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
