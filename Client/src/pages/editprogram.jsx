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
import { Footer, Navbar3 } from "@/widgets/layout";
import { Rating, duration } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';



const TABLE_HEAD = ["Name", "Length", "Day", "Description", "Action"];


export function EditProgram() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const program = JSON.parse(localStorage.getItem('editProgram'));
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

    const programData = {
        programId: program._id,
        name: ProgramName,
        duration: ProgramLength,
        specialist: userProfile._id,
        activities: trainings,
        category: ProgramType,
        description: ProgramDescription,
    };

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

    const handleSave = () => {
        if (trainingName && trainingLength && trainingDescription && trainingDay) {
            if (isNaN(trainingLength)) {
                alert(`Training Length must be a number`);
                return;
            }
            if (isNaN(trainingDay)) {
                alert(`Training Day Length must be a number`);
                return;
            }
            if (parseInt(trainingDay) > parseInt(trainingLength)) {
                alert(`Training Length must be larger than Training Day`);
                return;
            }
            if (parseInt(trainingDay) > parseInt(trainingLength)) {
                alert(`Training Length must be larger than Training Day`);
                return;
            }
            const existingTraining = trainings.find(
                (training) => training.name === trainingName
            );
            if (editIndex !== -1) {
                const updatedTrainings = [...trainings];
                const tempName = updatedTrainings[editIndex].name;
                updatedTrainings[editIndex] = {
                    name: trainingName,
                    duration: trainingLength,
                    day: trainingDay,
                    description: trainingDescription,
                };
                if (existingTraining && updatedTrainings[editIndex].name !== tempName) {
                    alert(`A training with the name "${trainingName}" already exists.`);
                    return;
                }
                console.log('check');
                setTrainings(updatedTrainings);
                setEditIndex(-1);
                setTrainingName('');
                setTrainingLength('');
                setTrainingDay('');
                setTrainingDescription('');
                setOpen(!open)
                return;
            }
            if (existingTraining) {
                alert(`A training with the name "${trainingName}" already exists.`);
                return;
            }
            else {
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
        setTrainingLength(trainingToEdit.duration);
        setTrainingDay(trainingToEdit.day);
        setTrainingDescription(trainingToEdit.description);
        setEditIndex(index);
        setOpen(!open)
    };

    const handleDelete = (index) => {
        const updatedTrainings = [...trainings];
        updatedTrainings.splice(index, 1);
        setTrainings(updatedTrainings);
    };

    const handleSaveAll = () => {
        axios.put('https://life-style-builder-api.onrender.com/api/programs/edit-program', programData)
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
                                    Edit Program
                                </Typography>
                            </div>
                            <form className="mt-8 mb-2 flex flex-col items-center">
                                <div className="mb-4 flex flex-col gap-6 bg-gray-200">
                                    <select className="bg-gray-200" value={ProgramType} onChange={handleSelectChange}>
                                        <option value="">Select Type</option>
                                        <option value="Medicine">Take Medicine</option>
                                        <option value="Lifestyle">Lifestyle Action</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Diet">Diet</option>
                                    </select>
                                    <Input size="lg" label="Program Name" value={ProgramName} onChange={(e) => setProgramName(e.target.value)} />
                                    <Input size="lg" label="Program Length(Days)" value={ProgramLength} onChange={handleLength} />
                                    <Input size="lg" label="Tags" value={ProgramTags} onChange={(e) => setProgramTags(e.target.value)} />
                                    <Textarea label="Short Description" value={ProgramDescription} onChange={(e) => setProgramDescription(e.target.value)} />
                                </div>
                                <Button className="flex items-center gap-3" onClick={handleOpen}>
                                    <BookmarkIcon strokeWidth={2} className="h-5 w-5" /> Add Action
                                </Button>
                                <Dialog
                                    size="xs"
                                    open={open}
                                    handler={handleOpen}
                                    className="bg-transparent shadow-none">
                                    <Card className="mx-auto w-full max-w-[24rem]">
                                        <CardHeader
                                            variant="gradient"
                                            color="blue"
                                            className="mb-4 grid h-28 place-items-center">
                                            <Typography variant="h3" color="white">
                                                Add Action
                                            </Typography>
                                        </CardHeader>
                                        <CardBody className="flex flex-col gap-4">
                                            <Input label="Training Name" size="lg" type="text"
                                                value={trainingName}
                                                onChange={(e) => setTrainingName(e.target.value)} />
                                            <Input label="Training Length" size="lg" type="text"
                                                value={trainingLength}
                                                onChange={(e) => setTrainingLength(e.target.value)} />
                                            <Input label="Training Day" size="lg" type="text"
                                                value={trainingDay}
                                                onChange={handleDay} />
                                            <Textarea label="Short Description" value={trainingDescription} onChange={(e) => setTrainingDescription(e.target.value)} />
                                        </CardBody>
                                        <CardFooter className="pt-0">
                                            <div className="mb-3 flex gap-2">
                                                <Button variant="gradient" onClick={handleSave} fullWidth>
                                                    Add
                                                </Button>
                                                <Button variant="gradient" onClick={handleOpen} fullWidth>
                                                    Cancel
                                                </Button></div>
                                        </CardFooter>
                                    </Card>
                                </Dialog>
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
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue" className="font-medium">
                                                        <div className="mb-3 flex gap-2">
                                                            <button onClick={() => handleDelete(index)}>Delete</button>
                                                            <button onClick={() => handleEdit(index)}>Edit</button>
                                                        </div>
                                                    </Typography>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="px-6 flex flex-col items-center">
                                    <Button className=" flex items-center gap-3 " color="green" onClick={handleSaveAll}>
                                        <KeyIcon strokeWidth={2} className="h-5 w-5" /> Save Program
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default EditProgram;