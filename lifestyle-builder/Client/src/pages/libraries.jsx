import {
  Avatar, Typography, Button, Tabs, Card,
  TabsHeader,
  TabsBody,
  Tab,
  Dialog,
  CardHeader,
  Input,
  CardBody,
  CardFooter,
  TabPanel,
  IconButton,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
  KeyIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Footer, Navbar3 } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton } from 'react-share';




export function Libraries() {


  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  //const [sharedLink, setDharedLink] = useState('');

  const [data1, setData] = useState(null);

  const [pageData, setPageData] = useState([]);

  const [sharedLink, setSharedLink] = useState('');
  const title = 'Check out my program on Lifestyle-Builder'; // Title of the shared content

  const handleDelete = (index) => {
    console.log('hello', pageData[index]._id);
    axios.delete('http://localhost:3001/api/programs/delete-program', {
      data: {
        programId: pageData[index]._id, // Replace programId with the actual program ID you want to delete
        specialistId: userProfile._id // Replace specialistId with the actual specialist ID
      }
    })
      .then(response => {
        // Handle success.
        const programData = response.data;
        console.log('Data', programData);

        // Remove the item from pageData array
        const updatedPageData = [...pageData];
        updatedPageData.splice(index, 1);
        setPageData(updatedPageData);
      })
      .catch(error => {
        // Handle error.
        console.log('Program Error:', error.response);
      });

  };

  const handleEdit = (index) => {
    const editProgram = pageData[index];
    localStorage.setItem('editProgram', JSON.stringify(editProgram));
    window.location.href = '/editprogram';
  };

  const handleWatch = (index) => {
    const watchProgram = pageData[index].program;
    console.log(watchProgram);
    localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
    window.location.href = `/watchprogram/`;
  };

  const handleReview = (index) => {
    const watchProgram = pageData[index].program;
    if (pageData[index].programStatus == 'Pending') {
      alert('You cannot review inactive program');
      return;
    }
    localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
    window.location.href = '/reviewprogram';
  };

  const handleReviews = (index) => {
    const editProgram = pageData[index];
    localStorage.setItem('editProgram', JSON.stringify(editProgram));
    window.location.href = '/watchreviews';
  };

  const handlePause = (index) => {
    console.log(userProfile._id);
    console.log(pageData[index]._id);
    axios.put('http://localhost:3001/api/users/pause-program', {
      userId: userProfile._id,
      programId: pageData[index]._id,
    })
      .then(response => {
        // Handle success.
        const programData = response.data;
        console.log('Data', programData);
        axios.get('http://localhost:3001/api/users/myPrograms', {
          params: { userId: userProfile._id }
        })
          .then(response => {
            // Handle success.
            const programData = response.data.programs;
            console.log('Dataaa', programData);
            setPageData(programData);
            console.log('check', programData.length);
          })
          .catch(error => {
            // Handle error.
            console.log('Program Error:', error.response);
          });
      })
      .catch(error => {
        // Handle error.
        alert('You cant pause inactive program');
        console.log('Program Error:', error.response);
      });

  };

  const handleUnpause = (index) => {
    console.log(userProfile._id);
    console.log(pageData[index]._id);
    axios.put('http://localhost:3001/api/users/reavtiviate-program', {
      userId: userProfile._id,
      programId: pageData[index]._id,
    })
      .then(response => {
        // Handle success.
        const programData = response.data;
        console.log('Data', programData);
        axios.get('http://localhost:3001/api/users/myPrograms', {
          params: { userId: userProfile._id }
        })
          .then(response => {
            // Handle success.
            const programData = response.data.programs;
            console.log('Dataaa', programData);
            setPageData(programData);
            console.log('check', programData.length);
          })
          .catch(error => {
            // Handle error.
            console.log('Program Error:', error.response);
          });
      })
      .catch(error => {
        // Handle error.
        console.log('Program Error:', error.response);
      });


  };
  

  const handleShare = (index) => {
    setOpen(!open);
    console.log(pageData[index]._id);
    const shareUrl = `http://localhost:5173/watchsharedprogram/${pageData[index]._id}`;
    setSharedLink(shareUrl);
    console.log(shareUrl);
  };

  const loadPrograms = () => {
    console.log('check', pageData);
  };

  if (userProfile.role == "specialist") {
    const TABLE_HEAD = ["Name", "Duration", "Rating", "Action"];
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      console.log(userProfile._id);
      axios.get('http://localhost:3001/api/specialists/programs', {
        params: {
          specialistId: userProfile._id
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data.programs;
          console.log('Data', programData);
          /* const convertedData = programData.map(program => {
             return {
               id: program._id,
               name: program.programName,
               startDate: program.programStartDate,
             };
           });*/
          setPageData(programData);
          console.log('check', pageData);
          console.log('check2', userProfile);

        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
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
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    My Programs
                  </Typography>
                </div>
                <Card className="overflow-scroll h-full w-full">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
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

                        <tr key={index}>
                          <td className="p-4">
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
                              {program.rating}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue" className="font-medium">
                              <div className="mb-3 flex gap-2">
                                <button onClick={() => handleDelete(index)}>Delete</button>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleReviews(index)}>Reviews</button>
                                <button onClick={() => handleShare(index)}>Share</button>
                                <Dialog
                                  size="md"
                                  open={open}
                                  handler={handleOpen}
                                  className="bg-transparent shadow-none">
                                  <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardHeader
                                      variant="gradient"
                                      color="blue"
                                      className="mb-4 grid h-28 place-items-center">
                                      <Typography variant="h3" color="white">
                                        Share
                                      </Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <div className="flex justify-center">
                                        <FacebookShareButton url={sharedLink} quote={title}>
                                          <IconButton className='mr-5' >
                                            <i className={`fa-brands text-lg fa-facebook`} />
                                          </IconButton>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={sharedLink} title={title} >
                                          <IconButton >
                                            <i className={`fa-brands text-lg fa-twitter`} />
                                          </IconButton>
                                        </TwitterShareButton>
                                      </div>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                      <div className="mb-3 flex gap-2">
                                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                                          Back
                                        </Button></div>
                                    </CardFooter>
                                  </Card>
                                </Dialog>
                              </div>
                            </Typography>
                          </td>
                          <td>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
                <div className="px-6 flex flex-col items-center mt-2">
                  <Link to="/newprogram">
                    <Button className=" flex items-center gap-3 " color="green">
                      <KeyIcon strokeWidth={2} className="h-5 w-5" /> New Program
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
  if (userProfile.role == "patient") {
    const TABLE_HEAD = ["Name", "Duration", "Status", "Action"];
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/myPrograms', {
          params: { userId: userProfile._id }
        });
        const programData = response.data.programs;
        console.log('Dataaa', programData);
        setPageData(programData);
        console.log('check', programData.length);
      } catch (error) {
        console.log('Program Error:', error.response);
      }
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
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    My Programs
                  </Typography>
                </div>
                <Card className="overflow-scroll h-full w-full">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
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
                      { pageData && (pageData.map((program, index) => (
                        <tr key={index}>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {program.program.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {program.program.duration}
                            </Typography>
                          </td>
                          <td className="p-4">
                            {program.programStatus == 'Active' && (<Typography variant="small" color="green" className="font-normal">
                              {program.programStatus}
                            </Typography>)}
                            {program.programStatus == 'Pending' && (<Typography variant="small" color="red" className="font-normal">
                              {program.programStatus}
                            </Typography>)}
                            {program.programStatus == 'Paused' && (<Typography variant="small" color="purple" className="font-normal">
                              {program.programStatus}
                            </Typography>)}
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue" className="font-medium">
                              <div className="mb-3 flex gap-2">
                                <button onClick={() => handleWatch(index)}>Watch</button>
                                <button onClick={() => handleReview(index)}>Review</button>
                                {program.programStatus != 'Paused' && (<button onClick={() => handlePause(index)}>Pause</button>)}
                                {program.programStatus == 'Paused' && (<button onClick={() => handleUnpause(index)}>Unpause</button>)}
                              </div>
                            </Typography>
                          </td>
                          <td>
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </Card>
                <div className="px-6 flex flex-col items-center mt-4">
                  <Link to="/homeuser">
                    <Button className=" flex items-center gap-3 " color="green">
                      <HomeIcon strokeWidth={2} className="h-5 w-5" /> Home
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
}
export default Libraries;