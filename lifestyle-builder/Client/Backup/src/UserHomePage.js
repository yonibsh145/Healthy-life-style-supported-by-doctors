import React from 'react';
import { Link } from 'react-router-dom'; 
import './UserHomePage.css'

const UserHomePage = () => {
  const user = {
    name: 'Shahar Almog',
    profileLink: '/profile',
    medicalCard: 'Medical card content',
    programHistory: 'Program history content',
    dailyGoals: ['Goal 1', 'Goal 2', 'Goal 3'], // Assuming an array of daily goals
  };

  return (
    <div className="home-page">
      <h1>Welcome, {user.name}!</h1>

      <div className="user-info">
        <Link to={user.profileLink}>Go to Profile</Link>
        <div className="medical-card">{user.medicalCard}</div>
        <div className="program-history">{user.programHistory}</div>
      </div>

      <div className="daily-goals">
        <h2>Daily Goals</h2>
        <ul>
          {user.dailyGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHomePage;