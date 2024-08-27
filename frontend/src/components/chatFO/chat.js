import React from 'react';

const Chat = ({ room, onClose }) => {
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
        {/* Chat messages and socket handling will go here */}
      </div>
      <div className="chat-footer">
        {/* Input for sending messages */}
        <input className='chatInput' type="text" placeholder="Type a message..." />
        <button className='mesbutton chat' type="button"><span className='material-symbols-outlined chat'>send</span></button>
      </div>
    </div>
  );
};

export default Chat;
