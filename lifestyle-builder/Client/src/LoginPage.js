import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const userType = '';
  

  function handleRegister() {
    navigate('/RegisterPage'); // Navigate to the register page
  }

  function handleLogin() {
    if(userType==='Builder'){
      navigate('/BuilderHomePage'); // Navigate to the register page
      return;
    }
    if(userType==='User'){
      navigate('/UserHomePage'); // Navigate to the register page
      return;
    }
    if(userType===''){
      navigate('/'); // Navigate to the register page
      return;
    }
  }
  function handleRememberMe() {
    setRememberMe(!rememberMe);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onClick={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={handleRegister}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;