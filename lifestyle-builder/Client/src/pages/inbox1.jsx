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
import { Footer, Navbar3 } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';
//import { Input } from "postcss";



export function Inbox1() {

    const [selectedChat, setSelectedChat] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [chatHistory, setChatHistory] = useState({});

    const handleChatSelection = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const senderName = 'Shahar Almog'; // Replace with the user's name from authentication or database

            const newMessage = `${senderName}: ${inputMessage}`;

            const updatedChatHistory = {
                ...chatHistory,
                [selectedChat]: [...(chatHistory[selectedChat] || []), newMessage],
            };

            setChatHistory(updatedChatHistory);
            setInputMessage('');
        }
    };

    const handleDeleteChatHistory = () => {
        if (selectedChat) {
            const updatedChatHistory = { ...chatHistory };
            delete updatedChatHistory[selectedChat];
            setChatHistory(updatedChatHistory);
        }
    };

    const handleDeleteInput = () => {
        setInputMessage('');
    };

    // Sample list of people
    const people = [
        { id: 1, name: 'Bdika', avatar: '1' },
        { id: 2, name: 'Bdika1', avatar: '2' },
        { id: 3, name: 'Bdika2', avatar: '3' },
    ];

    const chatMessages = chatHistory[selectedChat] || [];

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
                                </div>
                                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                                </div>
                            </div>
                            <div className="my-8 text-center">
                                <Typography variant="h2" color="blue-gray" className="mb-2">
                                    My Inbox
                                </Typography>
                            </div>
                            <div className="flex h-screen font-sans">
                                <div className="max-w-max bg-gray-100 p-4">
                                    {/* Map through your list of people and render each chat item */}
                                    {people.map((person) => (
                                        <div
                                            key={person.id}
                                            className={`flex items-center p-2 cursor-pointer ${selectedChat === person.id ? 'bg-gray-200' : ''
                                                } rounded-md mb-2`}
                                            onClick={() => handleChatSelection(person.id)}
                                        >
                                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">{person.avatar}</div>
                                            <div>{person.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1 bg-white p-4 border-2 border-blue-500 rounded">
                                    {/* Render the selected chat in the right section */}
                                    {selectedChat && (
                                        <div>
                                            {/* Render the chat messages here */}
                                            <div className="mb-4 border border-gray-500 rounded-lg p-4">
                                                {/* Render chat messages */}
                                                {chatMessages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-200 p-2 rounded-md mb-2"
                                                    >
                                                        {message}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Render the input box for typing messages */}
                                            <div className="flex items-center">
                                                <Input
                                                    type="text"
                                                    value={inputMessage}
                                                    onChange={handleInputChange}
                                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-3"
                                                />
                                                <Button
                                                    color="green"
                                                    onClick={handleSendMessage}
                                                    ripple="light"
                                                    className="mr-3"
                                                >
                                                    Send
                                                </Button>
                                                <Button
                                                    color="red"
                                                    onClick={handleDeleteInput}
                                                    ripple="light"
                                                    className="mr-3"
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    color="red"
                                                    onClick={handleDeleteChatHistory}
                                                    ripple="light"
                                                >
                                                    History Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )}
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

export default Inbox1;