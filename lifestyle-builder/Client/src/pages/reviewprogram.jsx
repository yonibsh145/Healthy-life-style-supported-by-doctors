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
import { Link } from "react-router-dom";


const TABLE_HEAD = ["Name", "Length", "Day", "Description"];


export function ReviewProgram() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const program = JSON.parse(localStorage.getItem('watchProgram'));
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewDescription, setReviewDescription] = useState('');

    const handleSend = () => {
        console.log(reviewRating);
        console.log(reviewDescription);
        const requestBody = {
            userId: userProfile._id,
            programId: program._id,
            rating: reviewRating,
            comment: reviewDescription,
        };

        axios.post('http://localhost:3001/api/programs/addReview', requestBody)
            .then(response => {
                console.log(response.data); // Handle the response data as needed
            })
            .catch(error => {
                alert('Program already reviewed');
                console.error(error); // Handle any errors that occur
            });
        console.log(program._id);
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
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                                    <div className="relative">
                                    </div>
                                </div>
                            </div>
                            <div className="my-8 text-center">
                                <Typography variant="h2" color="blue-gray" className="mb-2">
                                    Name: {program.name}
                                </Typography>
                            </div>
                            <form className="mt-8 mb-2 flex flex-col items-center">
                                <div className="mb-4 flex flex-row  gap-6 justify-center">
                                    <label className="mr-10">Rating:</label>
                                    <Rating name="half-rating-read" defaultValue={0} precision={0.5} value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} />
                                </div>
                                <div className="mb-4 flex flex-row  gap-6 justify-center">
                                    <label>Description:</label>
                                    <Textarea label="Short Description" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <Card className="overflow-scroll h-full w-full">
                            <div className="px-6 flex flex-row justify-center mt-10">
                                <Button className=" flex items-center gap-3 mr-10" color="green" onClick={handleSend}>
                                    <KeyIcon strokeWidth={2} className="h-5 w-5" /> Add Review
                                </Button>
                                <Link to="/homeuser">
                                    <Button className=" flex items-center gap-3 " color="blue">
                                        <KeyIcon strokeWidth={2} className="h-5 w-5" /> Back
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                    </div>
                </div>
            </section>
        </>
    );
}
export default ReviewProgram;