// components/ChatWidget.js
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../index.css'; // Nous créerons ce fichier CSS ensuite

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialisation de la connexion Socket.io
    socketRef.current = io('http://localhost:5000'); // Remplacez par votre URL backend

    // Écoute des messages
    socketRef.current.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      // Nettoyage à la destruction du composant
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Faire défiler vers le bas à chaque nouveau message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() && socketRef.current) {
      const message = {
        text: inputMessage,
        timestamp: new Date().toISOString(),
        sender: 'user' // Vous pouvez ajouter plus de détails ici
      };
      
      socketRef.current.emit('message', message);
      setInputMessage('');
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button 
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Support en direct</h3>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                <p>{msg.text}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre message..."
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;