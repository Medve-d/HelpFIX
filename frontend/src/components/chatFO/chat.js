import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const Chat = ({ room, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message, room });
      setMessages((prevMessages) => [...prevMessages, { message, fromSelf: true }]); // Mark message as sent
      setMessage(""); // Clear the input field
    }
  };
  

  useEffect(() => {
    joinRoom();

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, { message: data.message, fromSelf: false }]);
    });
    

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  if (!room) return null;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button onClick={onClose} className="close-chat-button">
          <strong><span className="material-symbols-outlined">close</span></strong>
        </button>
        <h4>Chat Room: {room}</h4>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.fromSelf ? 'sent' : 'received'}`}>
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          className='chatInput'
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='mesbutton chat' type="button" onClick={sendMessage}>
          <span className='material-symbols-outlined chat'>send</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
