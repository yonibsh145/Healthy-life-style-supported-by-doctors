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
    Textarea,
    IconButton,
} from "@material-tailwind/react";
import {
    MapPinIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, Navbar3 } from "@/widgets/layout";
import { Rating } from '@mui/material';
import React, { useState, useCallback, useMemom, useRef, useEffect } from 'react';
import { ArrowRightIcon, TrashIcon, BackspaceIcon } from "@heroicons/react/24/outline";
//import { Input } from "postcss";
import axios from 'axios';



export function Inbox1() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const [selectedChat, setSelectedChat] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [chatHistory, setChatHistory] = useState({});
    const [lastMessages, setLastMessages] = useState({});
    const scrollContainerRef = useRef(null);

    const handleChatSelection = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const senderName = userProfile.username; // Replace with the user's name from authentication or database

            const newMessage = `${senderName}: ${inputMessage}`;

            const updatedChatHistory = {
                ...chatHistory,
                [selectedChat]: [...(chatHistory[selectedChat] || []), newMessage],
            };

            const updatedLastMessages = {
                ...lastMessages,
                [selectedChat]: newMessage,
            };

            axios.post('https://life-style-builder-api.onrender.com/api/users/sendMessage', {
                params: {
                    senderId: '6491a86bfeb0e70fb72e3665',
                    receiverId: '6491c1e0760a2d8bebd5d81f',
                    message: inputMessage,
                }
            })
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
            setChatHistory(updatedChatHistory);
            setLastMessages(updatedLastMessages);
            setInputMessage('');
        }
    };

    const handleDeleteChatHistory = () => {
        if (selectedChat) {
            const updatedChatHistory = { ...chatHistory };
            const updatedLastMessages = { ...lastMessages };

            delete updatedChatHistory[selectedChat];
            delete updatedLastMessages[selectedChat];

            setChatHistory(updatedChatHistory);
            setLastMessages(updatedLastMessages);
        }
    };

    const handleDeleteInput = () => {
        setInputMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };



    // Sample list of people
    const people = [
        { id: 1, name: 'Shahar', avatar: '1' },
        { id: 2, name: 'Yoni', avatar: '2' },
        { id: 3, name: 'Lifestyle', avatar: '3' },
    ];

    const chatMessages = chatHistory[selectedChat] || [];

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

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
                                <div className="w-[300px] h-[500px] bg-gray-100 p-4 overflow-y-auto">
                                    {/* Map through your list of people and render each chat item */}
                                    {people.map((person) => (
                                        <div
                                            key={person.id}
                                            className={`flex items-center p-2 cursor-pointer ${selectedChat === person.id ? 'bg-gray-200' : ''} rounded-md mb-2`}
                                            onClick={() => handleChatSelection(person.id)}
                                        >
                                            <div className="relative w-12 h-12">
                                                <img
                                                    className="w-full h-full rounded-full object-cover"
                                                    src={`https://source.unsplash.com/random/60x60?person=${person.id}`}
                                                    alt={person.name}
                                                />
                                                {selectedChat === person.id && (
                                                    <div className="absolute inset-0 rounded-full border-2 border-blue-500" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-sm font-medium">{person.name}</h4>
                                                {/* Add message preview and timestamp here */}
                                                <p className="text-xs text-gray-500 w-[185px] truncate">{lastMessages[person.id]}</p> {/* Display last message with truncation */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-[500px] flex-1 bg-white p-4 border-2 border-blue-500 rounded">
                                    {/* Render the selected chat in the right section */}
                                    {selectedChat && (
                                        <div className="flex flex-col h-full">
                                            {/* Render the chat messages preview */}
                                            <div className="overflow-y-auto flex-grow" ref={scrollContainerRef}>
                                                {chatMessages.map((message, index) => {
                                                    const isSentMessage = message.startsWith(userProfile.username);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex mb-4 ${isSentMessage ? 'justify-end' : 'justify-start'}`}
                                                        >
                                                            <div
                                                                className={`rounded-lg p-2 max-w-[70%] ${isSentMessage ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}
                                                            >
                                                                <p className={`${isSentMessage ? 'text-right' : 'text-left'}`}>{message}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {/* Render the input box for typing messages */}
                                            <div className="flex items-center border-t border-gray-300 py-3">
                                                <div className="flex-grow">
                                                    <Input
                                                        type="text"
                                                        value={inputMessage}
                                                        onChange={handleInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        className="py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400"
                                                        placeholder="Type a message"
                                                    />
                                                </div>
                                                <div className="ml-4 flex space-x-2">
                                                    <IconButton
                                                        color="blue"
                                                        onClick={handleSendMessage}
                                                        ripple="light"
                                                        className="p-2"
                                                    >
                                                        <ArrowRightIcon className="h-6 w-6" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="red"
                                                        onClick={handleDeleteInput}
                                                        ripple="light"
                                                        className="p-2"
                                                    >
                                                        <BackspaceIcon className="h-6 w-6" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="red"
                                                        onClick={handleDeleteChatHistory}
                                                        ripple="light"
                                                        className="p-2"
                                                    >
                                                        <TrashIcon className="h-6 w-6" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Inbox1;

