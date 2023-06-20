import { Home, Profile, Libraries, NewProgram, AboutUs, SignIn, SignUp,HomeUser, OurProducts, Inbox1, EditProgram, WatchProgram, ReviewProgram, WaitingList, WatchReviews} from "@/pages";
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
    name: "newprogram",
    path: "/newprogram",
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
  {
    icon: DocumentTextIcon,
    name: "inbox1",
    path: "/inbox1",
    element: <Inbox1 />,
  },
  {
    icon: DocumentTextIcon,
    name: "editprogram",
    path: "/editprogram",
    element: <EditProgram />,
  },
  {
    icon: DocumentTextIcon,
    name: "watchprogram",
    path: "/watchprogram",
    element: <WatchProgram />,
  },
  {
    icon: DocumentTextIcon,
    name: "reviewprogram",
    path: "/reviewprogram",
    element: <ReviewProgram />,
  },
  {
    icon: DocumentTextIcon,
    name: "waitinglist",
    path: "/waitinglist",
    element: <WaitingList />,
  },
  {
    icon: DocumentTextIcon,
    name: "watchreviews",
    path: "/watchreviews",
    element: <WatchReviews />,
  },
];

export default routes;