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
import { Link } from "react-router-dom";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
  KeyIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";


const TABLE_HEAD = ["Name", "Start", "Rating", "Action"];

export function OurProducts() {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('check');
    axios.get('http://localhost:3001/api/programs')
      .then(response => {
        // Handle success.
        const programsData = response.data;
        setPageData(programsData);
      })
      .catch(error => {
        // Handle error.
        console.log('why');
        console.log('Program Error:', error.response);
      });

  };

  const handleWhat = () => {
    console.log('check');
    axios.get('http://localhost:3001/api/programs')
      .then(response => {
        // Handle success.
        const programsData = response.data;
        setPageData(programsData);
        console.log(programsData)
      })
      .catch(error => {
        // Handle error.
        console.log('Program Error:', error.response);
      });
  }

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



  const handleWatch = (index) => {
    //const programIndex = indexOfFirstItem + index; // Adjust index based on current page
    const watchProgram = pageData[index];
    localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
    window.location.href = `/watchprogram`;
  };

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar2 />
      </div>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  Program List
                </Typography>
              </div>
              <Card className="overflow-scroll h-full w-full">
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
                    {pageData.map((program, index) => (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4 ">
                          <Typography variant="small" color="blue-gray" className="font-normal text-center">
                            {program.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-center">
                            {formatDate(program.startDate)}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-center">
                            <Rating name="half-rating-read" value={program.rating} readOnly />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue" className="font-medium flex justify-center">
                            <div className="mb-3 flex gap-2">
                              <button onClick={() => handleWatch(index)}>Watch</button>
                            </div>
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <div className="px-6 flex flex-col items-center mt-2">
                <Link to="/home">
                  <Button className=" flex items-center gap-3 " color="green">
                    <KeyIcon strokeWidth={2} className="h-5 w-5" /> Back
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurProducts;
