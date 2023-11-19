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
        path: "/task-board",
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
        icon: <Icon as={MdBarChart} width='20px' height='20px'
                    color='inherit'/>,
        path: "/data-tables",
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
        name: "Google Auth Redirect",
        layout: "/redirect",
        path: ":code",
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
