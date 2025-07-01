import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";

import { Mic, MicOff, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "🙏 Namaste! I am the Voice of the Gods. Ask me about mythology, find temples, or seek help.",
    },
  ]);
  const [textInput, setTextInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: textInput,
    };
    const assistantMessage = {
      id: Date.now() + 1,
      type: "assistant",
      content: `✨ You asked: "${textInput}". Here's a divine response.`,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setTextInput("");
  };

  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "user",
          content: "Tell me about Lord Shiva",
        },
        {
          id: Date.now() + 1,
          type: "assistant",
          content:
            "🕉️ Lord Shiva, the destroyer, performs the cosmic dance of creation and destruction.",
        },
      ]);
    }, 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Voice of the Gods
          </h1>
          <Badge className="bg-red-100 text-red-800">Divine AI</Badge>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-xl shadow p-4 h-[400px] overflow-y-auto space-y-4 mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Text input */}
        <div className="flex items-center gap-2 mb-6">
          <Input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Ask something spiritual..."
            className="flex-1"
          />
          <Button
            onClick={handleTextSubmit}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white"
          >
            Send
          </Button>
        </div>

        {/* Voice Controls */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Button
            onClick={isListening ? () => setIsListening(false) : startListening}
            className={`w-full ${
              isListening
                ? "bg-red-600"
                : "bg-gradient-to-r from-red-500 to-orange-500"
            } text-white`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Voice
              </>
            )}
          </Button>
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="outline"
            className="w-full"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 mr-2" />
                Unmute
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                Mute
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
