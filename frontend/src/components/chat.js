import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket'; // Import the custom hook

const Chat = ({ isOpen, closeSideComponent, room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', room);

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket, room]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    socket.emit('chatMessage', { room, sender: 'User', message: input });
    setInput('');
  };

  return (
    <div className={`side-component ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-button" onClick={closeSideComponent} title="Fermer le chat">
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
      <div className="chat-lines">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
