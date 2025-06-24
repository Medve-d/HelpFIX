import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const ChatWidget = ({ prestataireId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialisation de la connexion Socket.io
    socketRef.current = io('http://localhost:5000'); // Remplacez par votre URL backend

    // Écoute des messages spécifiques au prestataire
    socketRef.current.on(`message-${prestataireId}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Nettoyage à la destruction du composant
      if (socketRef.current) {
        socketRef.current.off(`message-${prestataireId}`);
        socketRef.current.disconnect();
      }
    };
  }, [prestataireId]);

  useEffect(() => {
    // Faire défiler vers le bas à chaque nouveau message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() && socketRef.current) {
      const message = {
        text: inputMessage,
        timestamp: new Date().toISOString(),
        sender: 'user',
        prestataireId: prestataireId
      };

      // Émettre le message au prestataire spécifique
      socketRef.current.emit('private-message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-container">
        <div className="chat-header">
          <h3>Discussion avec le prestataire</h3>
          <button onClick={onClose} className="close-button">Fermer</button>
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
    </div>
  );
};

export default ChatWidget;
