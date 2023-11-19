import React from "react";

import {Icon} from "@chakra-ui/react";
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdCheckCircle,
    MdTask,
} from "react-icons/md";

// Admin Imports
import Calendar from "views/admin/calendar";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import TodoDashboard from "views/admin/todoDashboard";
import SubTask from "views/admin/subtaskDashboard";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import GoogleAuthRedirect from "views/auth/signIn";
// const userToken = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');

const routes = [
    {
        name: "Subtask",
        layout: "/admin",
        path: "/task-board/task/:id",
        icon: <Icon as={MdTask} width='20px' height='20px' color='inherit'/>,
        component: SubTask,
    },
    {
        name: "Task board",
        layout: "/admin",
        path: `/task-board/:usertoken/${userId}`,
        icon: <Icon as={MdCheckCircle} width='20px' height='20px' color='inherit'/>,
        component: TodoDashboard,
    },
    {
        name: "Calendar",
        layout: "/admin",
        path: "/calendar",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit'/>,
        component: Calendar,
    },
    {
        name: "Data Tables",
        layout: "/admin",
        path: "/data-tables",
        icon: <Icon as={MdBarChart} width='20px' height='20px'
                    color='inherit'/>,
        component: DataTables,
    },
    {
        name: "Profile",
        layout: "/admin",
        path: "/profile",
        icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit'/>,
        component: Profile,
    },
    {
        name: "Sign In",
        layout: "/auth",
        path: "/sign-in",
        icon: <Icon as={MdLock} width='20px' height='20px' color='inherit'/>,
        component: SignInCentered,
    },

];

export default routes;
