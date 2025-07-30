'use client';

import { useState } from 'react';

export default function RecipeChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! What recipe would you like today?' },
  ]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { role: 'user', text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');

  try {
    const res = await fetch('/api/generate');
    const data = await res.json();

    const botMessage = {
      role: 'bot',
      text: data.message || 'No message returned',
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: 'bot', text: 'Error contacting webhook.' },
    ]);
  }
};



  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <header className="bg-white shadow px-6 py-4 text-xl font-bold text-center">
        Recipe Assistant Chat
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-lg p-3 max-w-[80%] ${
              msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-green-100 self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </main>

      <form
        onSubmit={handleSubmit}
        className="bg-white px-4 py-3 flex items-center gap-2 border-t"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a recipe..."
          className="flex-1 px-3 py-2 border rounded-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
