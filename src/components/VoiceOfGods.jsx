// src/components/VoiceOfGods.jsx
import React, { useState, useRef } from "react";
import {
  FaMicrophone,
  FaPhone,
} from "react-icons/fa";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const VoiceOfGods = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);

  const startListening = () => {
    if (!recognition) return alert("Speech Recognition not supported.");

    recognition.lang = "en-IN";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      inputRef.current.value = spoken;
      sendToAI(spoken);
    };

    recognition.onerror = (event) => {
      alert("Error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const sendToAI = async (question) => {
     const apiKey = import.meta.env.VITE_GROQ_API_KEY;
     
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a spiritual guide for YatraVerse. Answer kindly and clearly about rituals, temples, mythology, and yatra tips.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";
    setResponse(reply);
    speakReply(reply);
  };

  const speakReply = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    speechSynthesis.speak(utter);
  };

  return (
    <section className="bg-gradient-to-b from-[#4a2600] to-[#3d1d00] py-20 px-4 text-white">
      <div className="max-w-xl mx-auto text-center bg-[#5e2a00] p-10 rounded-2xl shadow-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-6">Voice of the Gods - Ask Me Anything</h2>
        <p className="mb-6 text-gray-300">About rituals, mythology, or pilgrimage guidance</p>

        <div className="flex items-center border border-yellow-500 rounded-full overflow-hidden">
          <div
            className="px-4 text-yellow-400 cursor-pointer"
            onClick={startListening}
          >
            <FaMicrophone className={isListening ? "animate-bounce" : ""} />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask your question..."
            readOnly
            className="w-full px-4 py-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
          />
          <button
            onClick={() => sendToAI(transcript)}
            className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-500"
          >
            →
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-8 text-yellow-300">
          <button className="flex items-center gap-2 hover:text-yellow-100 transition-transform hover:scale-110">
            <FaMicrophone /> Voice Input
          </button>
          <button className="flex items-center gap-2 hover:text-yellow-100 transition-transform hover:scale-110">
            <FaPhone /> Call Priest
          </button>
        </div>

        {response && (
          <div className="mt-6 bg-[#4a2600] text-amber-200 p-4 rounded shadow text-left">
            <strong>Answer:</strong>
            <p className="mt-2 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VoiceOfGods;
