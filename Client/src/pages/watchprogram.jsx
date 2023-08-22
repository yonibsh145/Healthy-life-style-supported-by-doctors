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
import { Footer, Navbar3 , Navbar2 } from "@/widgets/layout";
import { Rating, duration } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const TABLE_HEAD = ["Name", "Length", "Day", "Description"];


export function WatchProgram() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const program = JSON.parse(localStorage.getItem('watchProgram'));


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



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setProgramName(program.name);
        setProgramType(program.kindOfProgram);
        setProgramDescription(program.description);
        setProgramLength(program.duration);
        setTrainings(program.activities);
    };

    const handleLength = (event) => {
        const inputValue = event.target.value;
        const integerValue = parseInt(inputValue);

        setProgramLength(integerValue);
    };

    const handleDay = (event) => {
        const inputValue = event.target.value;
        const integerValue = parseInt(inputValue);

        setTrainingDay(integerValue);
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
                window.location.href = '/homeuser';
            })
            .catch(error => {
                console.error(error); // Handle any errors that occur
                alert('You already has this program');
            });
        console.log(program._id);
    }

    const handleSave = () => {
        if (trainingName && trainingLength && trainingDescription && trainingDay) {
            const existingTraining = trainings.find(
                (training) => training.name === trainingName
            );
            if (existingTraining) {
                alert(`A training with the name "${trainingName}" already exists.`);
                return;
            }
            if (editIndex !== -1) {
                const updatedTrainings = [...trainings];
                updatedTrainings[editIndex] = {
                    name: trainingName,
                    duration: trainingLength,
                    day: trainingDay,
                    description: trainingDescription,
                };
                setTrainings(updatedTrainings);
                setEditIndex(-1);
            } else {
                const newTraining = { name: trainingName, duration: trainingLength, day: trainingDay, description: trainingDescription };
                setTrainings([...trainings, newTraining]);
            }
            setTrainingName('');
            setTrainingLength('');
            setTrainingDay('');
            setTrainingDescription('');
            setOpen(!open)
        }
        else {
            alert(`Fill all the fields.`);
        }
    };

    const handleEdit = (index) => {
        const trainingToEdit = trainings[index];
        setTrainingName(trainingToEdit.name);
        setTrainingLength(trainingToEdit.length);
        setTrainingDay(trainingToEdit.day);
        setTrainingDescription(trainingToEdit.description);
        setEditIndex(index);
        setOpen(!open)
    };

    const handleProfile = () => {
        const specialistProfile = program.specialist._id;
        localStorage.setItem('specialistProfile', JSON.stringify(specialistProfile));
        window.location.href = '/watchprofile';
    };

    const handleSaveAll = () => {
        axios.post('https://life-style-builder-api.onrender.com/api/programs', programData)
            .then(response => {
                // Handle success.
                const programData = response.data;
                console.log('Data', programData);
                window.location.href = '/libraries';
            })
            .catch(error => {
                // Handle error.
                console.log('Program Error:', error.response);
            });
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setProgramType(selectedOption.toString());
    };

    const handleSignUp = () => {
        window.location.href = '/sign-up';
    };
  
  

    if (!userProfile) {
        
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
                                        <Button className=" flex items-center gap-3 mr-10" color="green" onClick={handleSignUp}>
                                            <KeyIcon strokeWidth={2} className="h-5 w-5" /> Register
                                        </Button>
                                        <Link to="/homeuser">
                                            <Button className=" flex items-center gap-3 " color="blue">
                                                <KeyIcon strokeWidth={2} className="h-5 w-5" /> Back
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    }
    else {

        const programData = {
            name: ProgramName,
            duration: ProgramLength,
            specialist: userProfile._id,
            activities: trainings,
            kindOfProgram: ProgramType,
            description: ProgramDescription,
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
                                        <Button className=" flex items-center gap-3 mr-10" color="green" onClick={handleUse}>
                                            <KeyIcon strokeWidth={2} className="h-5 w-5" /> Use Program
                                        </Button>
                                        <Link to="/homeuser">
                                            <Button className=" flex items-center gap-3 " color="blue">
                                                <KeyIcon strokeWidth={2} className="h-5 w-5" /> Back
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    }

}
export default WatchProgram;