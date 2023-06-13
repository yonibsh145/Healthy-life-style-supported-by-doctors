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
import { Footer } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';



const TABLE_HEAD = ["Name", "Length", "Action"];


export function NewProgram() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const [trainings, setTrainings] = useState([]);
    const [trainingName, setTrainingName] = useState('');
    const [trainingLength, setTrainingLength] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const handleSave = () => {
        if (trainingName && trainingLength) {
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
                    length: trainingLength,
                };
                setTrainings(updatedTrainings);
                setEditIndex(-1);
            } else {
                const newTraining = { name: trainingName, length: trainingLength };
                setTrainings([...trainings, newTraining]);
            }
            setTrainingName('');
            setTrainingLength('');
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
        setEditIndex(index);
        setOpen(!open)
    };

    const handleDelete = (index) => {
        const updatedTrainings = [...trainings];
        updatedTrainings.splice(index, 1);
        setTrainings(updatedTrainings);
    };

    const handleSaveAll = () => {
        setSavedTrainings([...savedTrainings, ...trainings]);
        setTrainings([]);
    };


    return (
        <>
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
                            <form className="mt-8 mb-2 flex flex-col items-center">
                                <div className="mb-4 flex flex-col gap-6 bg-gray-200">
                                    <select className="bg-gray-200">
                                        <option value="">Select Type</option>
                                        <option value="Medicine">Take Medicine</option>
                                        <option value="Trainer">Lifestyle Action</option>
                                        <option value="Trainer">Sport</option>
                                        <option value="Trainer">Diet</option>
                                    </select>
                                    <Input size="lg" label="Program Name" />
                                    <Input size="lg" label="Program Length(Days)" />
                                    <Input size="lg" label="Tags" />
                                    <Textarea label="Short Description" />
                                </div>
                                <Button className="flex items-center gap-3" onClick={handleOpen}>
                                    <BookmarkIcon strokeWidth={2} className="h-5 w-5" /> Add Action
                                </Button>
                                <Dialog
                                    size="xs"
                                    open={open}
                                    handler={handleOpen}
                                    className="bg-transparent shadow-none"
                                >
                                    <Card className="mx-auto w-full max-w-[24rem]">
                                        <CardHeader
                                            variant="gradient"
                                            color="blue"
                                            className="mb-4 grid h-28 place-items-center"
                                        >
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
                                <h2>Unsaved Trainings:</h2>
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
                                                        {training.length}
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
export default NewProgram;