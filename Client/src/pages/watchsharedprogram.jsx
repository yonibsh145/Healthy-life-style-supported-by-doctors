import {
    Avatar, Typography, Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    Input,
    Button,
    Textarea,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    CardHeader,
    CardBody,
    CardFooter,
    Checkbox,
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
} from "@heroicons/react/24/outline";
import { Footer, Navbar2, Navbar3 } from "@/widgets/layout";
import { Rating, duration } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const TABLE_HEAD = ["Name", "Length", "Day", "Description"];


export function WatchSharedProgram() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const program = JSON.parse(localStorage.getItem('watchProgram'));
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const [trainings, setTrainings] = useState([]);
    const [trainingName, setTrainingName] = useState('');
    const [trainingLength, setTrainingLength] = useState('');
    const [trainingDescription, setTrainingDescription] = useState('');
    const [trainingDay, setTrainingDay] = useState('');
    const [ProgramName, setProgramName] = useState('');
    const [ProgramLength, setProgramLength] = useState('');
    const [ProgramTags, setProgramTags] = useState('');
    const [ProgramDescription, setProgramDescription] = useState('');
    const [ProgramType, setProgramType] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [specialist, setSpecialist] = useState('');

    /*const programData = {
        name: ProgramName,
        duration: ProgramLength,
        specialist: userProfile._id,
        activities: trainings,
        kindOfProgram: ProgramType,
        description: ProgramDescription,
    };*/

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const programID = parts[parts.length - 1];
        axios.get('https://life-style-builder-api.onrender.com/api/programs/program', {
            params: {
                programId: programID,
            }
        })
            .then(response => {
                // Handle success.
                const programData = response.data;
                console.log('Data', programData);
                setProgramName(programData.name);
                setProgramType(programData.kindOfProgram);
                setProgramDescription(programData.description);
                setProgramLength(programData.duration);
                setTrainings(programData.activities);
                setSpecialist(program.specialist);

            })
            .catch(error => {
                // Handle error.
                console.log('Program Error:', error.response);
            });

    };

    const handleProfile = () => {
        const specialistProfile = program.specialist;
        localStorage.setItem('specialistProfile', JSON.stringify(specialistProfile));
        window.location.href = '/watchprofile';
    };


    const handleUse = () => {
        const requestBody = {
            userId: userProfile._id,
            programId: program._id,
        };
        console.log('here', program._id);
        console.log('check', requestBody);
        axios.put('https://life-style-builder-api.onrender.com/api/users/use-program', requestBody)
            .then(response => {
                console.log(response.data); // Handle the response data as needed
            })
            .catch(error => {
                console.error(error); // Handle any errors that occur
            });
        console.log(program._id);
    }


    return (
        <>
            <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                {
                    userProfile && <Navbar3 />
                }
                {
                    !userProfile && <Navbar2 />
                }
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
                                    Name: {ProgramName}
                                </Typography>
                            </div>
                            <form className="mt-8 mb-2 flex flex-col items-center">
                            <Button className="bg-blue-400 mb-6" onClick={handleProfile}>Specialist Profile</Button>
                                <div className="mb-4 flex flex-col gap-6 ">
                                    <label>Type: {ProgramType}</label>
                                    <label>Length: {ProgramLength}</label>
                                    <label>Description: {ProgramDescription}</label>
                                </div>

                            </form>
                        </div>
                        {trainings.length > 0 && (
                            <Card className="overflow-scroll h-full w-full">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70">
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainings.map((training, index) => (

                                            <tr key={index}>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {training.name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {training.duration}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {training.day}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {training.description}
                                                    </Typography>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="px-6 flex flex-row justify-center mt-10">
                                    {
                                        userProfile && (<Button className=" flex items-center gap-3 mr-10" color="green" onClick={handleUse}>
                                            <KeyIcon strokeWidth={2} className="h-5 w-5" /> Use Program
                                        </Button>)
                                    }
                                                                        {
                                        !userProfile && (<Link to="/sign-up">
                                            <Button className=" flex items-center gap-3 mr-10 " color="green">
                                                <KeyIcon strokeWidth={2} className="h-5 w-5" /> Register
                                            </Button>
                                        </Link>)
                                    }
                                    
                                    {
                                        userProfile && (<Link to="/homeuser">
                                            <Button className=" flex items-center gap-3 " color="blue">
                                                <KeyIcon strokeWidth={2} className="h-5 w-5" /> Home
                                            </Button>
                                        </Link>)
                                    }
                                    {
                                        !userProfile && (<Link to="/home">
                                            <Button className=" flex items-center gap-3 " color="blue">
                                                <KeyIcon strokeWidth={2} className="h-5 w-5" /> Home
                                            </Button>
                                        </Link>)
                                    }
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default WatchSharedProgram;