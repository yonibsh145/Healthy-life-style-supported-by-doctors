import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import your CSS file for styling

const HomePage = () => {

  const navigate = useNavigate();

  function handleSignIn() {
    navigate('/LoginPage'); // Navigate to the register page
  }

  function handleProfle() {
    navigate('/Profile'); // Navigate to the register page
  }

  function handleLibrary() {
    navigate('/Library'); // Navigate to the register page
  }

  function handleProgram() {
    navigate('/ProgramPage'); // Navigate to the register page
  }


  return (
    <div className="container">
      <div className="menu">
        <div className="logo">Logo</div>
        <button className="menu-item" onClick={handleProgram}>Our Products</button>
        <button className="menu-item" onClick={handleLibrary}>Our Expert</button>
        <button className="menu-item" onClick={handleProfle}>Change Language</button>
        <button className="menu-item" onClick={handleSignIn}>Sign In</button>
      </div>
      <div className="content">
        <h1 className="title">Lifestyle-Builder</h1>
        <h2 className="title">The Most Popular Healthy Life Programs</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Creator</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task 1</td>
              <td>John Doe</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>Jane Smith</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>Adam Johnson</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;