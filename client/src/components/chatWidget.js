import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../index.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // La connexion se fait maintenant ici
    socketRef.current = io('http://localhost:5000');

    // Écoute des messages venant des autres
    socketRef.current.on('message', (incomingMessage) => {
        // Ajoute le message reçu à la liste
        // On ne vérifie pas si c'est notre propre message car le serveur le renvoie à tout le monde
        // C'est la façon la plus simple de s'assurer que tout le monde est synchronisé.
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []); // Ce useEffect ne s'exécute qu'une fois

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ▼▼▼ FONCTION MODIFIÉE ▼▼▼
  const sendMessage = () => {
    if (inputMessage.trim() && socketRef.current) {
      const message = {
        // Utilise un ID plus unique pour la key
        id: `${Date.now()}-${socketRef.current.id}`, 
        text: inputMessage,
        timestamp: new Date().toISOString(),
        sender: 'user', // Identifie l'envoyeur comme 'user'
      };
      
      // 1. Étape clé : Envoie le message au serveur
      socketRef.current.emit('message', message);
      
      // 2. Étape clé : Affiche TON message immédiatement, sans attendre le serveur.
      // C'est la mise à jour optimiste !
      // Note: Le serveur va quand même renvoyer ce message. Dans un chat de groupe,
      // cela créerait un doublon. Mais pour un chat de support (1-to-1) ou si le serveur
      // ne renvoie pas le message à l'émetteur original, c'est OK.
      // Pour une solution simple, on suppose que le serveur renvoie à tout le monde,
      // et c'est ce que notre backend fait. Le message s'affichera donc pour tout le monde.
      // Pour éviter le double affichage pour soi-même, le plus simple est de laisser le serveur gérer l'état
      // et ne PAS faire la ligne ci-dessous. Mais pour que "quelque chose se passe", on la laisse pour le moment.
      // La meilleure solution est que le serveur renvoie un événement 'message-sent' juste à l'émetteur
      // et un événement 'new-message' aux autres.
      // On va choisir la simplicité : on ajoute le message localement, et on ignore le retour du serveur s'il nous concerne.
      
      // Pour que ça marche SANS doublon, modifions le `useEffect` d'écoute :
      // On le laisse comme au début. La source de vérité est le serveur.
      // MAIS on ajoute le message localement pour l'effet immédiat
      setMessages((prevMessages) => [...prevMessages, message]); // <-- **LA LIGNE QUI CHANGE TOUT**

      setInputMessage('');
    }
  };
  
  // Dans la partie `useEffect` qui écoute les messages, on va s'assurer de ne pas ajouter de doublon
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('message', (incomingMessage) => {
        setMessages((prevMessages) => {
            // Si le message est déjà dans la liste (par son ID), on ne l'ajoute pas.
            if (prevMessages.some(msg => msg.id === incomingMessage.id)) {
                return prevMessages;
            }
            return [...prevMessages, incomingMessage];
        });
    });

    return () => {
        if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);


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
          <div className="chat-header"><h3>Support en direct</h3></div>
          
          <div className="chat-messages">
            {/* ▼▼▼ UTILISATION DE L'ID UNIQUE POUR LA KEY ▼▼▼ */}
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                <p>{msg.text}</p>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
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