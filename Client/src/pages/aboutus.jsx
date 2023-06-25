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
import { PageTitle, Footer, Navbar2 } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

const myString = `Welcome to Lifestyle Builder!\n
your go-to app for transforming your lifestyle and achieving your personal goals!\n
Our app is designed to connect specialists with regular users, 
enabling the creation of personalized programs to enhance and improve your daily routines.\n 
Whether you're looking to boost your fitness, nutrition, mental well-being, or overall lifestyle habits, Lifestyle Builder is here to guide you every step of the way.\n
At Lifestyle Builder, we understand that each person has unique needs and aspirations when it comes to improving their lifestyle.\n
That's why we've created a platform that empowers specialists to design tailor-made programs that align with your specific goals.\n
Our aim is to facilitate a seamless experience for both specialists and regular users, fostering a collaborative environment where expertise and motivation converge.\n\n`;


const myString1 = `For Regular Users:
Our app allows regular users like you to benefit from the expertise and knowledge of specialists in various lifestyle fields\n
You can browse through a wide range of programs offered by specialists and select the ones that resonate with your objectives.\n
Whether you're looking to enhance your fitness level, adopt healthier eating habits, manage stress, or develop a positive mindset,
Lifestyle Builder provides you with the tools and guidance to achieve your goals.\n
After completing a program, you have the opportunity to provide valuable feedback by reviewing and rating it.\n
Your input not only helps us ensure the quality of our programs but also allows specialists to refine their offerings based on user experiences.\n
We believe in the power of community and aim to create a supportive ecosystem where regular users can share their achievements,
challenges, and insights with others on a similar journey.\n\n`;

const myString2= `For Specialists:
Lifestyle Builder provides a platform for specialists to showcase their expertise and help regular users create positive lifestyle changes.\n
As a specialist, you can create your own programs, incorporating your knowledge and experience to address the unique needs of your clients.\n
Our app enables you to interact directly with users, understand their requirements, and provide personalized guidance and support throughout their journey.\n
We value the contributions of our specialists and strive to foster an environment that promotes growth and recognition.\n 
By receiving feedback and ratings from users, you can continuously refine and enhance your programs,
establishing yourself as a trusted authority in your field. Furthermore, Lifestyle Builder offers a platform for specialists to connect with like-minded professionals,
collaborate on projects, and share insights and best practices.\n
Join Lifestyle Builder today and embark on a transformative journey towards a healthier, more fulfilling lifestyle.\n
Together, we can build a community that embraces personal growth, supports one another, and celebrates the achievements of every individual.\n
Let Lifestyle Builder be your companion in realizing your aspirations and creating lasting positive change in your life.\n\n`;

const myString3 = `Start your journey with Lifestyle Builder now and unlock your full potential!`;

export function AboutUs() {
  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar2 />
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
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="About us">
            {myString}
          </PageTitle>
          <PageTitle >
            {myString1}
          </PageTitle>
          <PageTitle>
            {myString2}
          </PageTitle>
          <PageTitle>
            {myString3}
          </PageTitle>
        </div>
      </section>

    </>
  );
}

export default AboutUs;
