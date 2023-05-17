import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import ChatPage from './ChatPage';
import Profile from './Profile';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;