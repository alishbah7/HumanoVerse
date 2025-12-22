
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { Send, Bot, User, X, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  error?: boolean;
}

const Chatbot = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.body.classList.toggle('show-chatbot', isChatbotVisible);
  }, [isChatbotVisible]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://humanoverse-chatbot-backend.up.railway.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: "Sorry, I'm having trouble connecting to the server.", error: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isChatbotVisible) {
      inputRef.current?.focus();
    }
  }, [isChatbotVisible]);

  return (
    <>
      <button className="chatbot-toggler" onClick={() => setChatbotVisible(!isChatbotVisible)}>
        <span><MessageSquare size={24} /></span>
        <span><X size={24} /></span>
      </button>
      <div className="chatbot">
        <header>
          <h2>🤖 𝐻𝓊𝓂𝒶𝓃𝑜𝒱𝑒𝓇𝓈𝑒</h2>
          <span className="close-btn" onClick={() => setChatbotVisible(false)}><X size={20} /></span>
        </header>
        <ul ref={chatboxRef} className="chatbox">
          {messages.length === 0 && !isLoading ? (
            <div className="initial-message">
              <span className="robot-icon"><Bot size={48} /></span>
              <p>How can I help you today?</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <li key={index} className={`chat ${message.role === 'bot' ? 'incoming' : 'outgoing'}`}>
                {message.role === 'bot' && (
                  <div className="chat-icon">
                    <Bot size={24} />
                  </div>
                )}
                <div className="chat-content">
                  {message.role === 'bot' && <span className="chat-name">HumanoVerse Bot</span>}
                  <p className={message.error ? 'error' : ''}>{message.content}</p>
                </div>
              </li>
            ))
          )}
          {isLoading && (
            <li className="chat incoming">
              <div className="chat-icon"><Bot size={24} /></div>
              <div className="chat-content">
                <span className="chat-name">HumanoVerse Bot</span>
                <div className="typing-animation">
                  <div className="typing-dot" style={{ '--delay': '0.2s' } as React.CSSProperties}></div>
                  <div className="typing-dot" style={{ '--delay': '0.3s' } as React.CSSProperties}></div>
                  <div className="typing-dot" style={{ '--delay': '0.4s' } as React.CSSProperties}></div>
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className="chat-input">
          <textarea
            ref={inputRef}
            placeholder="Type a message..."
            spellCheck="false"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (handleSendMessage(), e.preventDefault())}
            required
          ></textarea>
          <button id="send-btn" onClick={handleSendMessage}><Send size={24} /></button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;

