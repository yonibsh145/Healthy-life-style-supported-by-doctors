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
} from "@heroicons/react/24/outline";
import { Footer, Navbar3 } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const TABLE_HEAD = ["User Name", "Program Request", "Action"];


export function WaitingList() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    const [data1, setData] = useState(null);

    const [pageData, setPageData] = useState([]);




    const handleAccept = (index) => {
        const requestData = {
            specialistId: userProfile._id,
            userId: pageData[index].user._id, // Replace programId with the actual program ID you want to delete
            programId: pageData[index].program._id,// Replace specialistId with the actual specialist ID
            action: "accept",
          }
        console.log('hello', pageData[index]._id);
        axios.put('https://life-style-builder-api.onrender.com/api/specialists/updaterequest', requestData)
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

    const handleDeny = (index) => {
        alert('Dont deny a program please.');
    };

    const handleWatch = (index) => {
        const watchProgram = pageData[index];
        localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
        window.location.href = '/watchprogram';
    };

    const handleReview = (index) => {
        const watchProgram = pageData[index];
        localStorage.setItem('watchProgram', JSON.stringify(watchProgram));
        window.location.href = '/reviewprogram';
    };


    const loadPrograms = () => {
        console.log('check', pageData);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log(userProfile._id);
        axios.get('https://life-style-builder-api.onrender.com/api/specialists/requests', {
            params: {
                specialistId: userProfile._id
            }
        })
            .then(response => {
                // Handle success.
                const programData = response.data.requests;
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
                                <Typography variant="h1" color="blue-gray" className="mb-2">
                                    Waiting List
                                </Typography>
                            </div>
                            {
                                pageData.length == 0 && (
                                    <div className="my-8 text-center">
                                    <Typography variant="h5" color="red" className="mb-2">
                                        Empty List.
                                    </Typography>
                                </div>
                                )
                            }
                            {
                                pageData.length > 0 && (

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
                                                                {program.user.username}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {program.program.name}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue" className="font-medium">
                                                                <div className="mb-3 flex gap-2">
                                                                    <button onClick={() => handleAccept(index)}>Accept</button>
                                                                    <button onClick={() => handleDeny(index)}>Reject</button>
                                                                </div>
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Card>
                                )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default WaitingList;