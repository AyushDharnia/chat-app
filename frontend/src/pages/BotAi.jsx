// Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';

function BotAi() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    try {
      const response = await axios.post('http://localhost:8000/chat/', {
        message: userMessage,
      });

      setChatHistory((prev) => [
        ...prev,
        { sender: 'user', text: userMessage },
        { sender: 'bot', text: response.data.response },
      ]);

      setUserMessage('');
    } catch (err) {
      console.error('Error talking to chatbot:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-20 w-full bg-blue-300 p-4">
      <h2 className="text-xl font-bold mb-4">Chatbot</h2>
      <div className="mb-4 space-y-2">
        {chatHistory.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
        className="border p-2 mb-2"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}

export default BotAi;