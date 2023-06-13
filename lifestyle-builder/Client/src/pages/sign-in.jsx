import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";

export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    email: email,
    password: password
  };

  function handleLogin(event) {
    event.preventDefault();
    console.log(userData.email)
    /*
    axios.post('http://localhost:3001/api/users/login', userData)
      .then(response => {
        // Handle success.
        console.log('User profile', response.data.user);
        console.log('User token', response.data.token);
        navigate('/sign-in'); // Navigate to the login page
      })
      .catch(error => {
        // Handle error.
        console.log('Login Error:', error.response);
      });
      */
  
  
  }

  return (
    <>
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
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" type="email" label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              variant="standard"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleLogin}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
       <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;