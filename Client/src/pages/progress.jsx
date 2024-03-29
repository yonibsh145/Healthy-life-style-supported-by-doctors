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
    Progress,
} from "@material-tailwind/react";
import {
    MapPinIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, Navbar3 } from "@/widgets/layout";
import CircularProgress, {
} from '@mui/material/CircularProgress';
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
//import { Input } from "postcss";



export function Progressing() {

    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    const [open, setOpen] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [programData, setProgramData] = useState([]);
    const handleOpen = () => setOpen(!open);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        username: fullName,
        email: email,
        password: password,
    };

    const data = [
        {
            label: "Programs",
            value: "html",
            desc: `In this section of the stats you can see the number of users that using the specialist programs.\n
        The counts of programs created by the specialist: ${profileData.length}`,
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


    /*if (userProfile.role == "specialist") {

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            axios.get('http://localhost:3001/api/specialists/patients', {
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
                });


        };

        const handleEdit = () => {
            axios.put('http://localhost:3001/api/specialists/profile', userData)
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


        return (
            <>
                <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                    <Navbar3 />
                </div>
                <section className="relative block h-[50vh]">
                    <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?quality=86&strip=all')] bg-cover bg-center" />
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
                                        <Button className="bg-blue-400" onClick={handleOpen}>Edit</Button>
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
                                                        Edit Profile
                                                    </Typography>
                                                </CardHeader>
                                                <CardBody>
                                                    <div className="flex-col mb-3 flex gap-3">
                                                        <Input label="Name" size="lg" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} ></Input>
                                                        <Input label="Email" size="lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                                                        <Input
                                                            type="password"
                                                            label="Password"
                                                            size="lg"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </CardBody>
                                                <CardFooter className="pt-0">
                                                    <div className="mb-3 flex gap-2">
                                                        <Button variant="gradient" fullWidth onClick={handleEdit}>
                                                            Change
                                                        </Button>
                                                        <Button variant="gradient" fullWidth onClick={handleOpen}>
                                                            Cancel
                                                        </Button></div>
                                                </CardFooter>
                                            </Card>
                                        </Dialog>
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
                                            <Rating name="half-rating-read" value={(userProfile.rating)} readOnly />
                                        </Typography>
                                    </div>
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <Typography className="font-medium text-blue-gray-700">
                                        </Typography>
                                    </div>
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <Typography className="font-medium text-blue-gray-700">
                                            My tags
                                        </Typography>
                                        <div className="flex items-center">
                                            <Progress
                                                color="blue"
                                                value={progressPercentage}
                                                className="w-full"
                                            />
                                            <span className="ml-4">{`${progressPercentage}%`}</span>
                                        </div>
                                        <Progress value={50} />
                                    </div>

                                </div>
                                <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                                    <div className="mt-2 flex flex-wrap justify-center">
                                        <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                                            <Typography className="mb-8 font-normal text-blue-gray-500">
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
            </>
        );
    }
*/

    const programStats = {
        typeA: {
            completed: 4,
            active: 4,
        },
        typeB: {
            completed: 10,
            active: 5,
        },
        typeC: {
            completed: 5,
            active: 2,
        },
        typeD: {
            completed: 7,
            active: 4,
        },
    };

    // Calculate the total number of completed and active programs
    const totalCompleted = Object.values(programStats).reduce(
        (total, stats) => total + stats.completed,
        0
    );
    const totalActive = Object.values(programStats).reduce(
        (total, stats) => total + stats.active,
        0
    );

    if (userProfile.role === 'patient') {
        return (
            <>
                <div className="container mx-auto">
                    <Navbar3 />
                </div>
                <section className="relative h-[50vh]">
                    <div className="bg-[url('https://www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?quality=86&strip=all')] bg-cover bg-center absolute top-0 h-full w-full" />
                    <div className="absolute top-0 h-full w-full bg-black bg-opacity-75" />
                </section>
                <section className="relative bg-blue-gray-50 py-16 px-4">
                    <div className="container mx-auto">
                        <div className="relative mb-6 -mt-64 flex flex-col break-words rounded-3xl bg-white shadow-xl">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2">
                                        <div className="relative" />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4">
                                            {/* Your content here */}
                                        </div>
                                    </div>
                                </div>
                                <div className="my-8 text-center">
                                    <Typography variant="h2" color="blue-gray" className="mb-2">
                                        My Analysis
                                    </Typography>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="w-1/2">
                                        <Progress
                                            value={((totalCompleted / (totalCompleted + totalActive)) * 100).toFixed(2)}
                                            label={`${totalCompleted} Programs Completed`}
                                            barClassName="h-3 rounded bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                                    <div className="mt-2 flex flex-wrap justify-center">
                                        {/* Your active daily actions labels */}
                                        {Object.entries(programStats).map(([type, stats]) => (
                                            <span className="active-action" key={type}>{`${type}: ${stats.completed} Completed, ${stats.active} Active`}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

}

export default Progressing;