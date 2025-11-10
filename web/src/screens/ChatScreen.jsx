import React, { useState, useRef, useEffect } from 'react';
import { queryLLM } from '../api/llm';
import '../styles/screens.css';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your crypto AI assistant. Ask me about market trends, trading strategies, or cryptocurrency analysis.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await queryLLM(input);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to get response. Please check your LLM configuration.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen chat-screen">
      <div className="screen-header">
        <h1>AI Chat Assistant</h1>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message message-${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message message-bot loading">
            <div className="message-content">
              <span className="typing-indicator">
                <span></span><span></span><span></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me about crypto..."
          disabled={loading}
          className="chat-input"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
