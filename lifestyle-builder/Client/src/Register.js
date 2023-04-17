import React, { useState } from "react";
import './register.css';

function RegisterForm() {

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormValues = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (
      formValues.username.trim() === "" ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === "" ||
      formValues.confirmPassword.trim() === ""
    ) {
      alert("Please fill out all fields");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      alert("Please enter a valid email address");
      return false;
    }
  
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
  
    if (formValues.username === "takenUsername") {
      alert("Username is already taken");
      return false;
    }
  
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    } 
    // Do something with the form data, like sending it to a server
    console.log(formValues);
    console.log("Form data is valid");
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={updateFormValues}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={updateFormValues}
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={updateFormValues}
              />
            </td>
          </tr>
          <tr>
            <td>Confirm Password:</td>
            <td>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={updateFormValues}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default RegisterForm;