import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, Navbar, Navbar3, Navbar2 } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

const userType = "";


export function Inbox() {
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
        { id: 1, name: 'John Doe', avatar: 'Avatar 1' },
        { id: 2, name: 'Jane Smith', avatar: 'Avatar 2' },
        { id: 3, name: 'Alice Johnson', avatar: 'Avatar 3' },
    ];

    const chatMessages = chatHistory[selectedChat] || [];

    return (
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
                                Delete Chat History
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Inbox;