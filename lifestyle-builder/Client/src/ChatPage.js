import React, { useState } from 'react';
import './ChatPage.css';
const ChatPage = () => {
    const [message, setMessage] = useState('');
  
    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };
  
    const handleSendMessage = () => {
      if (message.trim() !== '') {
        // Send the message
        setMessage('');
      }
    };
  
    const handleDeleteMessage = () => {
      setMessage('');
    };
  
    return (
      <div className="chat-container">
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          {message && (
            <button onClick={handleDeleteMessage}>Delete</button>
          )}
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  };
  
  export default ChatPage;