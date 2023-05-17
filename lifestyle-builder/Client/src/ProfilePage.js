import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function handleChat() {
    navigate('/ChatPage'); // Navigate to the register page
  }

  return (
    <div className="profile-container">
      <div className="left-box">
        <div className="profile-picture"></div>
        <h2 className="name">Shahar Almog</h2>
        <p>Last login: 15th May 2023</p>
        <p>Type: User</p>
        <p>Rating: 4.5</p>
        <p>Bio: Check Check Check</p>
        <p>Titles: Title 1, Title 2, Title 3</p>
        <button className="chat-button" onClick={handleChat}>Chat</button>
      </div>
      <div className="right-box">
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabClick('profile')}
          >
            Profile Stats
          </button>
          <button
            className={`tab ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => handleTabClick('programs')}
          >
            Programs Stats
          </button>
          <button
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => handleTabClick('personal')}
          >
            Personal Stats
          </button>
        </div>
        <div className="stats-content">
          {activeTab === 'profile' && <p>Profile Stats Content</p>}
          {activeTab === 'programs' && <p>Programs Stats Content</p>}
          {activeTab === 'personal' && <p>Personal Stats Content</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;