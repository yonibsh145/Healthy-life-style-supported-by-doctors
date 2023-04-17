import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

   const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handleLogin = () => {
    // add code here
  };

  return (
    <div>
      <label>Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;