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
import { SimpleFooter, Navbar2 } from "@/widgets/layout";

export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');


  const userData = {
    email: email,
    password: password
  };

  function handleLogin(event) {
    event.preventDefault();
    // Field validation
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    //Select type
    if (selectedValue == "") {
      alert("Please select a user type");
      return;
    }

    console.log(userData.email)
    if (selectedValue == "User") {
      axios.post('https://lifestylebulider-api.onrender.com/api/users/login', userData)
        .then(response => {
          // Handle success.
          const userProfile = response.data;
          console.log('User profile', userProfile);
          console.log('User token', userProfile.token);

          // Save the user data and token in local storage
          localStorage.setItem('userProfile', JSON.stringify(userProfile));

          //const userProfile1 = JSON.parse(localStorage.getItem('userProfile'));

          //console.log('check', userProfile1.username)

          // Redirect to the home page
          window.location.href = '/homeuser';
        })
        .catch(error => {
          alert("Invalid email or password.\nCheck the correct user type too.");
          console.log('Login Error:', error.response);
        });
    }
    if (selectedValue == "Specialist") {
      axios.post('https://lifestylebulider-api.onrender.com/api/specialists/login', userData)
        .then(response => {
          // Handle success.
          const userProfile = response.data;
          console.log('User profile', userProfile);
          console.log('User token', userProfile.token);
          // Save the user data and token in local storage
          localStorage.setItem('userProfile', JSON.stringify(userProfile));


          //const userProfile1 = JSON.parse(localStorage.getItem('userProfile'));

          //console.log('check', userProfile1.username)

          // Redirect to the home page
          window.location.href = '/homeuser';
        })
        .catch(error => {
          // Handle error.
          console.log('Login Error:', error.response);
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
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="">Select a user type</option>
              <option value="User">User</option>
              <option value="Specialist">Specialist</option>
            </select>
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
    </>
  );
}

export default SignIn;