import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { io } from 'socket.io-client';
import '../index.css';

const ChatWidget = ({ prestataireId, prestationId, onClose, isOpen }) => {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // --- Charger toutes les conversations ---
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/conversations/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // --- Initialiser Socket.IO ---
  useEffect(() => {
    if (!user) return;

    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('receiveMessage', (message) => {
      // Mettre à jour la liste des conversations
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === message.conversationId
            ? { ...conv, lastMessage: message.text }
            : conv
        )
      );
      // Ajouter le message si conversation active
      if (activeConv && message.conversationId === activeConv._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [user, activeConv]);

  // --- Ouvrir ou créer conversation unique ---
  const openConversation = useCallback(async () => {
    if (!user || !prestataireId || !prestationId) return;
    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ receiverId: prestataireId, prestationId }),
      });
      if (!res.ok) return;
      const conv = await res.json();
      setActiveConv(conv);
      setMessages([]); // reset messages pour nouvelle conversation
      socketRef.current.emit('joinConversation', conv._id);
    } catch (err) {
      console.error(err);
    }
  }, [user, prestataireId, prestationId]);

  useEffect(() => {
    openConversation();
  }, [openConversation]);

  // --- Charger messages de la conversation active ---
  const fetchMessages = useCallback(
    async (convId) => {
      if (!convId || !user) return;
      try {
        const res = await fetch(`/api/messages/${convId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    },
    [user]
  );

  useEffect(() => {
    if (!activeConv) return;
    fetchMessages(activeConv._id);
    socketRef.current.emit('joinConversation', activeConv._id);
  }, [activeConv, fetchMessages]);

  // --- Auto scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Envoyer message ---
  const handleSend = async () => {
    if (!newMessage.trim() || !activeConv) return;

    const msg = {
      conversationId: activeConv._id,
      sender: user._id,
      text: newMessage,
      createdAt: new Date().toISOString(),
    };

    try {
      // Ajouter localement pour affichage immédiat
      setMessages((prev) => [...prev, msg]);

      // Envoyer au serveur
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(msg),
      });

      const savedMsg = await res.json();

      // Remplacer le message temporaire par celui du serveur (avec _id)
      setMessages((prev) =>
        prev.map((m) => (m === msg ? savedMsg : m))
      );

      // Émettre le message sur Socket.IO pour les autres
      socketRef.current.emit('sendMessage', savedMsg);

      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  // --- Supprimer conversation ---
  const handleDeleteConversation = async (convId) => {
    try {
      await fetch(`/api/conversations/${convId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setConversations((prev) => prev.filter((c) => c._id !== convId));
      if (activeConv && activeConv._id === convId) {
        setActiveConv(null);
        setMessages([]);
        openConversation(); // créer nouvelle conversation si nécessaire
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fermer chat entier ---
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose?.(), 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`chat-sidebar ${isClosing ? 'closing' : 'open'}`}>
      <div className="sidebar-header">
        <h3>{activeConv ? activeConv.receiverName : 'Mes conversations'}</h3>
        <div className="header-buttons">
          {activeConv && (
            <button
              className="close-conv-btn"
              onClick={() => handleDeleteConversation(activeConv._id)}
              title="Supprimer la conversation"
            >
              ×
            </button>
          )}
          <button className="close-btn" onClick={handleClose} title="Fermer le chat">
            ×
          </button>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv._id}
              className={`conversation-item ${activeConv?._id === conv._id ? 'active' : ''}`}
              onClick={() => setActiveConv(conv)}
            >
              <strong>{conv.receiverName || 'Utilisateur'}</strong>
              <div className="last-message">{conv.lastMessage || 'Aucun message'}</div>
            </div>
          ))}
        </div>

        <div className="chat-container">
          {!activeConv ? (
            <div className="loading-chat">Sélectionnez une conversation...</div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id || msg.createdAt}
                    className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}
                  >
                    <p>{msg.text}</p>
                    <span className="timestamp">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tapez votre message..."
                />
                <button onClick={handleSend}>Envoyer</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
