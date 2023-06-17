import React from "react";
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


export function HomeUser() {
  const userProfile1 = JSON.parse(localStorage.getItem('userProfile'));
  if (userProfile1.role == "specialist") {
    return (
      <>
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar3 />
        </div>
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('https://www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?quality=86&strip=all')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Improve your life with - Lifestyle Builder
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  You can find your best program
                  You can find your best trainer
                  You can live your life better
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map(({ color, title, icon, description }) => (
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle heading="Meet the trainers">
              Here you can see a bit of our trainers.
              Each trainer create his own programs.
              Desire to be a trainer?
              Desire to use a program?
              SignUp now!
            </PageTitle>
            <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
              {teamData.map(({ img, name, position, socials }) => (
                <TeamCard
                  key={name}
                  img={img}
                  name={name}
                  position={position}
                  socials={
                    <div className="flex items-center gap-2">
                      {socials.map(({ color, name }) => (
                        <IconButton key={name} color={color} variant="text">
                          <i className={`fa-brands text-lg fa-${name}`} />
                        </IconButton>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>

      </>
    );
  }
  if (userProfile1.role == "patient") {
    return (
      <>
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar3 />
        </div>
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('https://www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?quality=86&strip=all')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Improve your life with - Lifestyle Builder
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  You can find your best program
                  You can find your best trainer
                  You can live your life better
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map(({ color, title, icon, description }) => (
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle heading="Meet the trainers">
              Here you can see a bit of our trainers.
              Each trainer create his own programs.
              Desire to be a trainer?
              Desire to use a program?
              SignUp now!
            </PageTitle>
            <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
              {teamData.map(({ img, name, position, socials }) => (
                <TeamCard
                  key={name}
                  img={img}
                  name={name}
                  position={position}
                  socials={
                    <div className="flex items-center gap-2">
                      {socials.map(({ color, name }) => (
                        <IconButton key={name} color={color} variant="text">
                          <i className={`fa-brands text-lg fa-${name}`} />
                        </IconButton>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>

      </>
    );
  }

}

export default HomeUser;