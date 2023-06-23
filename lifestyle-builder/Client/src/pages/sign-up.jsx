import { Link, useNavigate } from "react-router-dom";
import React, { useState, Fragment } from 'react';

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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { SimpleFooter, Navbar2 } from "@/widgets/layout";
import axios from 'axios';

export function SignUp() {


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const userData = {
    username: fullName,
    email: email,
    password: password,
  };

  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };


  const handleOpen = () => setOpen(!open);


  function handleSubmit(event) {
    event.preventDefault();

    // Field validation
    if (!fullName || !email || !password || !repassword) {
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
    if (password.length < 6 || repassword < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }

    if (password != repassword) {
      alert("The passwords do not matches please retry again.");
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
            <Input
              variant="standard"
              type="password"
              label="Repassword"
              size="lg"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="">Select a user type</option>
              <option value="User">User</option>
              <option value="Specialist">Specialist</option>
            </select>
            <div className="-ml-2.5">
              <Checkbox label={
                <Typography color="blue-gray" className="font-medium flex">I agree with the
                  <Typography as="a" href="#" color="blue" className="font-medium hover:text-blue-700 transition-colors" onClick={handleOpen}>
                    &nbsp;Terms and Conditions
                  </Typography>.
                </Typography>
              } />
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="place-items-center">Terms and Conditions</DialogHeader>
                <DialogBody divider className="h-[40rem] overflow-scroll">
                  <Typography className="font-normal">
                    <ol>
                      <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                      <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, personal information may be stored by us for use by third parties.</li>
                      <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                      <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</li>
                      <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                      <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>
                      <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
                      <li>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
                      <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of [Your Country].</li>
                    </ol>
                  </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                  <Button variant="outlined" color="red" onClick={handleOpen}>
                    close
                  </Button>
                </DialogFooter>
              </Dialog>
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