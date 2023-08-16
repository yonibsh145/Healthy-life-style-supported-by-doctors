import {
  Avatar, Typography, Button, Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, Navbar3, Navbar2 } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
//import { Input } from "postcss";



export function WatchProfile() {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const specialistProfile = JSON.parse(localStorage.getItem('specialistProfile'));

  const [profileData, setProfileData] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const handleChat = () => {
    window.location.href = '/inbox1';
  }

  const data = [
    {
      label: "Programs",
      value: "html",
      desc: `In this section of the stats you can see the number of users that using the specialist programs.\n
      The counts of programs created by the specialist: ${usersData.length}`,
    },
    {
      label: "Reviews",
      value: "react",
      desc: `In this section of the stats you can see the number of reviews that the user posses.\n
      The counts of reviews created by the specialist: ${programData.length}`,
    },
    {
      label: "Ratings",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  if(!userProfile){
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      axios.get('https://life-style-builder-api.onrender.com/api/specialists/profile', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data;
          console.log('Data', programData);
          setProfileData(programData);
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

      axios.get('https://life-style-builder-api.onrender.com/api/specialists/patients', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data;
          console.log('Dataa', programData);
          setUsersData(programData);
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

      axios.get('https://life-style-builder-api.onrender.com/api/specialists/programs', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          const programData = response.data.programs;
          console.log('Data', programData);
          setProgramData(programData);
          console.log('check2', programData);


        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

    };

    const handleSignup = () => {
      window.location.href = '/sign-up';
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
                      <div className="-mt-20 w-40">
                        <Avatar
                          src={`https://source.unsplash.com/random/150x150?person=${profileData._id}`}
                          alt="Profile picture"
                          variant="circular"
                          className="h-full w-full shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                    <Button className="bg-blue-400" onClick={handleSignup}>Register</Button>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {usersData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Users
                        </Typography>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {programData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Programs
                        </Typography>
                      </div>
                      <div className="p-3 text-center lg:mr-4">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          0
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Reviews
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    {profileData.name}
                  </Typography>
                  <div className="mb-16 flex items-center justify-center gap-2">
                    <Typography className="font-medium text-blue-gray-700">
                    <Rating name="half-rating-read" value={parseInt(profileData.rating)}  precision={0.5} readOnly />
                    </Typography>
                  </div>
                  <Typography className="font-medium text-blue-gray-700">
                    Tags: {profileData.tags}
                  </Typography>
                </div>
                <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                  <div className="mt-2 flex flex-wrap justify-center">
                    <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                      <Typography className="mb-8 font-normal text-blue-gray-500">
                        Bio:{profileData.bio}
                      </Typography>
                      <Button variant="text">Statistics</Button>
                      <Tabs value="html">
                        <TabsHeader>
                          {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                              {label}
                            </Tab>
                          ))}
                        </TabsHeader>
                        <TabsBody>
                          {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                              {desc}
                            </TabPanel>
                          ))}
                        </TabsBody>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-blue-gray-50/50">
          <Footer />
        </div>
      </>
    );

  }
  else{
  if (userProfile.role == "specialist") {

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      axios.get('https://life-style-builder-api.onrender.com/api/specialists/profile', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data;
          console.log('Data', programData);
          setProfileData(programData);
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });


      /* axios.get('http://localhost:3001/api/specialists/patients', {
         params: {
           specialistId: userProfile._id
         }
       })
         .then(response => {
           // Handle success.
           const programData = response.data;
           console.log('Data', programData);
           setProfileData(programData);
           console.log('check', profileData.length)
         })
         .catch(error => {
           // Handle error.
           console.log('Program Error:', error.response);
         });
 
         axios.get('http://localhost:3001/api/specialists/programs', {
           params: {
             specialistId: userProfile._id
           }
         })
           .then(response => {
             const programData = response.data.programs;
             console.log('Data', programData);
             setProgramData(programData);
             console.log('check2', programData);
 
 
           })
           .catch(error => {
             // Handle error.
             console.log('Program Error:', error.response);
           });*/


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
                      <div className="-mt-20 w-40">
                        <Avatar
                          src={`https://source.unsplash.com/random/150x150?person=${userProfile.id}`}
                          alt="Profile picture"
                          variant="circular"
                          className="h-full w-full shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                    <Button className="bg-blue-400" onClick={handleChat}>Chat</Button>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {profileData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Users
                        </Typography>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {programData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Programs
                        </Typography>
                      </div>
                      <div className="p-3 text-center lg:mr-4">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          89
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Reviews
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    {userProfile.username}
                  </Typography>
                  <div className="mb-16 flex items-center justify-center gap-2">
                    <Typography className="font-medium text-blue-gray-700">
                      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    </Typography>
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography className="font-medium text-blue-gray-700">
                      Solution Manager - Creative Tim Officer
                    </Typography>
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography className="font-medium text-blue-gray-700">
                      University of Computer Science
                    </Typography>
                  </div>

                </div>
                <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                  <div className="mt-2 flex flex-wrap justify-center">
                    <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                      <Typography className="mb-8 font-normal text-blue-gray-500">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </Typography>
                      <Button variant="text">Statistics</Button>
                      <Tabs value="html">
                        <TabsHeader>
                          {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                              {label}
                            </Tab>
                          ))}
                        </TabsHeader>
                        <TabsBody>
                          {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                              {desc}
                            </TabPanel>
                          ))}
                        </TabsBody>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-blue-gray-50/50">
          <Footer />
        </div>
      </>
    );
  }


  if (userProfile.role == "patient") {

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      axios.get('https://life-style-builder-api.onrender.com/api/specialists/profile', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data;
          console.log('Data', programData);
          setProfileData(programData);
          console.log()
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

      axios.get('https://life-style-builder-api.onrender.com/api/specialists/patients', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          // Handle success.
          const programData = response.data;
          console.log('Dataa', programData);
          setUsersData(programData);
          console.log('check', profileData.length)
        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

      axios.get('https://life-style-builder-api.onrender.com/api/specialists/programs', {
        params: {
          specialistId: specialistProfile
        }
      })
        .then(response => {
          const programData = response.data.programs;
          console.log('Data', programData);
          setProgramData(programData);
          console.log('check2', programData);


        })
        .catch(error => {
          // Handle error.
          console.log('Program Error:', error.response);
        });

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
                      <div className="-mt-20 w-40">
                        <Avatar
                          src={`https://source.unsplash.com/random/150x150?person=${profileData._id}`}
                          alt="Profile picture"
                          variant="circular"
                          className="h-full w-full shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                    <Button className="bg-blue-400" onClick={handleChat}>Chat</Button>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {usersData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Users
                        </Typography>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          {programData.length}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Programs
                        </Typography>
                      </div>
                      <div className="p-3 text-center lg:mr-4">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold uppercase"
                        >
                          0
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Reviews
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <Typography variant="h2" color="blue-gray" className="mb-2">
                    {profileData.name}
                  </Typography>
                  <div className="mb-16 flex items-center justify-center gap-2">
                    <Typography className="font-medium text-blue-gray-700">
                      <Rating name="half-rating-read" value={parseInt(profileData.rating)}  precision={0.5} readOnly />
                    </Typography>
                  </div>
                  <Typography className="font-medium text-blue-gray-700">
                    Tags: {profileData.tags}
                  </Typography>
                </div>
                <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                  <div className="mt-2 flex flex-wrap justify-center">
                    <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                      <Typography className="mb-8 font-normal text-blue-gray-500">
                        Bio:{profileData.bio}
                      </Typography>
                      <Button variant="text">Statistics</Button>
                      <Tabs value="html">
                        <TabsHeader>
                          {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                              {label}
                            </Tab>
                          ))}
                        </TabsHeader>
                        <TabsBody>
                          {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                              {desc}
                            </TabPanel>
                          ))}
                        </TabsBody>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-blue-gray-50/50">
          <Footer />
        </div>
      </>
    );
  }
}

}

export default WatchProfile;