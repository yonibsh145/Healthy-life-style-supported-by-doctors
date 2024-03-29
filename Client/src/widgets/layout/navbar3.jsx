import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";


export function Navbar3() {
    const [openNav, setOpenNav] = useState(false);
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    function handleLogout() {
        // Remove the user profile from local storage
        userProfile.username = "";
        userProfile.role = "";
        localStorage.removeItem('userProfile');
    }


    if (userProfile.role == "specialist") {
        const navList = (
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="profile" className="flex items-center">
                        Profile
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="libraries" className="flex items-center">
                        Programs
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="newprogram" className="flex items-center">
                        New Program
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="waitinglist" className="flex items-center">
                        Waiting List
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="inbox1" className="flex items-center">
                        Inbox
                    </a>
                </Typography>
            </ul>
        );


        return (
            <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/homeuser"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Lifestyle-Builder
                    </Typography>
                    <div className="hidden lg:block">{navList}</div>
                    <div className="hidden gap-2 lg:flex">
                        <Typography
                            color="purple"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            Hello {userProfile.username}
                        </Typography>
                        <Link to="/home">
                            <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={handleLogout}>
                                <span>Logout</span>
                            </Button>
                        </Link>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    <div className="container mx-auto">
                        {navList}
                        <Link to="/home">
                            <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleLogout}>
                                <span>LogOut</span>
                            </Button></Link>
                    </div>
                </MobileNav>
            </Navbar>
        );

    }
    if (userProfile.role == "patient") {
        const navList = (
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="profile" className="flex items-center">
                        Profile
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="libraries" className="flex items-center">
                        Programs
                    </a>
                </Typography>
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <a href="inbox1" className="flex items-center">
                        Inbox
                    </a>
                </Typography>
            </ul>
        );



        return (
            <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/homeuser"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Lifestyle-Builder
                    </Typography>
                    <div className="hidden lg:block">{navList}</div>
                    <div className="hidden gap-2 lg:flex">
                        <Typography
                            color="purple"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            Hello {userProfile.username}
                        </Typography>
                        <Link to="/home">
                            <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={handleLogout}>
                                <span>Logout</span>
                            </Button>
                        </Link>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    <div className="container mx-auto">
                        {navList}
                        <Link to="/home">
                            <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleLogout}>
                                <span>LogOut</span>
                            </Button></Link>
                    </div>
                </MobileNav>
            </Navbar>
        );
    }




}

export default Navbar3;