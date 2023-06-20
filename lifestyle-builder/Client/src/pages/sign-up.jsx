import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { SimpleFooter, Navbar2 } from "@/widgets/layout";
import axios from 'axios';

export function SignUp() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const userData = {
    username: fullName,
    email: email,
    password: password,
  };


  function handleSubmit(event) {
    event.preventDefault();

    // Field validation
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }

    //Select type
    if (selectedValue == "") {
      alert("Please select a user type");
      return;
    }

    //Select type
    if (selectedValue == "User") {
      axios.post('http://localhost:3001/api/users/register', userData)
        .then(response => {
          // Handle success.
          console.log('User profile', response.data.user);
          console.log('User token', response.data.token);
          window.location.href = '/sign-in';
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
    }

    //Select type
    if (selectedValue == "Specialist") {
      axios.post('http://localhost:3001/api/specialists/register', userData)
        .then(response => {
          // Handle success.
          console.log('User profile', response.data.user);
          console.log('User token', response.data.token);
          window.location.href = '/sign-in';
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });

    }

  }

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar2 />
      </div>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" label="Name" size="lg" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input variant="standard" type="email" label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="">Select a user type</option>
              <option value="User">User</option>
              <option value="Specialist">Specialist</option>
            </select>
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;