import { Home, Profile, Libraries, NewProgram, AboutUs, SignIn, SignUp,HomeUser, OurProducts } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: InformationCircleIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Libraries",
    path: "/libraries",
    element: <Libraries />,
  },
  {
    icon: UserPlusIcon,
    name: "new-program",
    path: "/new-program",
    element: <NewProgram />,
  },
  {
    icon: DocumentTextIcon,
    name: "SignIn",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: DocumentTextIcon,
    name: "SignUp",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    icon: DocumentTextIcon,
    name: "AboutUs",
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    icon: DocumentTextIcon,
    name: "homeuser",
    path: "/homeuser",
    element: <HomeUser />,
  },
  {
    icon: DocumentTextIcon,
    name: "ourproducts",
    path: "/ourproducts",
    element: <OurProducts />,
  },
];

export default routes;