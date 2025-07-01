import React, { useState, useRef, useEffect } from 'react';

const SmartAssistant = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '🙏 Namaste! Welcome to Yatre 2025! Ask anything about darshan, rituals, or accommodation.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Hardcoded Groq API Key (replace with yours)
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', text: input.trim() },
      { type: 'bot', text: 'Typing...', isTyping: true },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: 'system',
              content: "You are a helpful pilgrimage assistant for Yatre 2025. Answer clearly in English or Hindi. Include details like rituals, timings, and location.",
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, no response.';
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { type: 'bot', text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          type: 'bot',
          text: '❌ Error: Please check your network or Groq API key.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <div className="h-80 overflow-y-auto border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 text-sm ${
              msg.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-xs break-words ${
                msg.type === 'user'
                  ? 'bg-orange-100 text-black'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask about rituals, temple timings, etc."
          className="flex-grow p-2 border border-gray-300 rounded resize-none h-12 text-black"
        ></textarea>
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="ml-2 px-4 bg-orange-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SmartAssistant;