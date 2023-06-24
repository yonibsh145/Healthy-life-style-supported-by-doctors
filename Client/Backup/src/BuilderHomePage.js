import React from 'react';
import './BuilderHomePage.css';

const BuilderHomePage = () => {

  return (
    <div className="home-container">
      <h1>Welcome, Builder!</h1>
      <div className="buttons-container">
        <button className="create-button">Create New Program</button>
        <button className="edit-button">Edit Program</button>
        <button className="delete-button">Delete Program</button>
      </div>
      <a href='/Library' className="library-link">Go to Library</a>
      <div className="message-box">
        <input type="text" placeholder="Enter your message" />
        <button className="message-button">Send Message</button>
      </div>
    </div>
  );
};

export default BuilderHomePage;
