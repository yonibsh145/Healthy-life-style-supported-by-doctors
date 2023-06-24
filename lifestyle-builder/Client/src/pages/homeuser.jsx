import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Dialog,
  Alert,
} from "@material-tailwind/react";
import { Rating } from '@mui/material';
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, Navbar, Navbar3, Navbar2 } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Routes, Route } from "react-router-dom";
import routes from "@/routes";
import axios from 'axios';

const userType = "";

export function HomeUser() {
  const userProfile1 = JSON.parse(localStorage.getItem('userProfile'));
  const [pageData, setPageData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(pageData.length / itemsPerPage);
  const TABLE_HEAD = ["Name", "Start", "Rating", "Action"];
  const TABLE_HEAD2 = ["Program", "Daily Count", "Action"];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pageData.slice(indexOfFirstItem, indexOfLastItem);


  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);


  const handleWatch = (index) => {
    const programIndex = indexOfFirstItem + index; // Adjust index based on current page
    const watchProgram = pageData[programIndex];
    localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
    window.location.href = `/watchprogram`;
  };

  const handleReviews = (index) => {
    const watchProgram = pageData[index];
    localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
    console.log(watchProgram);
    window.location.href = '/watchreviews';
  };

  const handleAnalysis = () => {
    window.location.href = '/progess';
  };

  const handleDaily = (index) => {
    //const programIndex = indexOfFirstItem + index; // Adjust index based on current page
    const watchDaily = dailyData[index];
    localStorage.setItem('watchDaily', JSON.stringify(watchDaily));
    window.location.href = `/dailyactivities`;
  };

  const useProgram = (index) => {
    const programIndex = indexOfFirstItem + index; // Adjust index based on current page
    const requestBody = {
      userId: userProfile1._id,
      programId: pageData[programIndex]._id,
    };

    console.log('check', requestBody);
    axios.put('http://localhost:3001/api/users/use-program', requestBody)
      .then(response => {
        console.log(response.data); // Handle the response data as needed
      })
      .catch(error => {
        alert('You already has this program');
        console.error(error); // Handle any errors that occur
      });



  };



  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    return new Date(dateString).toLocaleString('en-US', options);
  };


  if (userProfile1.role == "specialist") {
    return (
      <>
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar3 />
        </div>
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('https://www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?quality=86&strip=all')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Improve your life with - Lifestyle Builder
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  You can find your best program
                  You can find your best trainer
                  You can live your life better
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map(({ color, title, icon, description }) => (
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle heading="Meet the trainers">
              Here you can see a bit of our trainers.
              Each trainer create his own programs.
              Desire to be a trainer?
              Desire to use a program?
              SignUp now!
            </PageTitle>
            <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
              {teamData.map(({ img, name, position, socials }) => (
                <TeamCard
                  key={name}
                  img={img}
                  name={name}
                  position={position}
                  socials={
                    <div className="flex items-center gap-2">
                      {socials.map(({ color, name }) => (
                        <IconButton key={name} color={color} variant="text">
                          <i className={`fa-brands text-lg fa-${name}`} />
                        </IconButton>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>

      </>
    );
  }
  if (userProfile1.role === "patient") {

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/programs');
        const programsData = response.data;
        setPageData(programsData);
      } catch (error) {
        console.log('Programs Error:', error.response);
      }

      axios.get('http://localhost:3001/api/programs/program-daily-activities', {
        params: {
          userId: userProfile1._id,
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data.dailyActivities;
          console.log('Dataaa', programData);
          setDailyData(programData);
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });
    };

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const emptyRow = () => {
      const remainingRows = itemsPerPage - currentItems.length;
      const emptyRowContent = [];

      for (let i = 0; i < remainingRows; i++) {
        emptyRowContent.push(
          <tr key={`empty-${i}`}>
            <td className="p-4" colSpan="4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Empty
              </Typography>
            </td>
          </tr>
        );
      }

      return emptyRowContent;
    };

    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded-full ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar3 />
        </div>
        <section className="relative block h-[50vh]">
          <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        </section>
        <section className="relative bg-blue-gray-50/50 py-16 px-4">
          <div className="container mx-auto">
            <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
              <div class="flex">
                <div class="w-1/2 border-r border-gray-400">
                  <Typography variant="h2" color="blue" className="mb-2 flex justify-center mt-4">
                    Daily Activities
                  </Typography>
                  <div className="w-full flex justify-center">
                    <table className="w-full max-w-full border-collapse">
                      <thead>
                        <tr>
                          {TABLE_HEAD2.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dailyData.map((program, index) => (
                          <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4 text-center">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {program.programName}
                              </Typography>
                            </td>
                            <td className="p-4 text-center">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {program.activities.length}
                              </Typography>
                            </td>
                            <td className="p-4 flex justify-center">
                              <Typography variant="small" color="blue" className="font-medium">
                                <div className="mb-3 flex gap-2">
                                  <button onClick={() => handleDaily(index)}>Watch</button>
                                </div>
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="w-1/2 ">
                  <Typography variant="h2" color="blue" className="mb-2 flex justify-center mt-4">
                    Program List
                  </Typography>
                  <table className="border">
                    <thead className="border-b">
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((program, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                          <td className="p-4 ">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {program.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {formatDate(program.startDate)}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              <Rating name="half-rating-read" value={program.rating} readOnly />
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue" className="font-medium">
                              <div className="mb-3 flex gap-2">
                                <button onClick={() => handleWatch(index)}>Watch</button>
                                <button onClick={() => useProgram(index)}>Use</button>
                                <button onClick={() => handleReviews(index)}>Reviews</button>
                              </div>
                            </Typography>
                          </td>
                        </tr>
                      ))}
                      {emptyRow()}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-4">{pagination}</div>
                </div>
              </div>
              <hr className="my-4 border-gray-300 border-t-4" />
            </div>
            <div className="px-6 flex flex-row justify-center mt-6">
              <Button className=" flex items-center gap-3" color="green" onClick={handleAnalysis}>
                My Analytics
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default HomeUser;