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
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
// import RTL from "views/admin/rtl";
import TodoDashboard from "views/admin/todoDashboard";
import SubTask from "views/admin/subtaskDashboard";

// Auth Imports
import SignInCentered from "views/auth/signIn";
const userId = localStorage.getItem('userId');
const routes = [
    {
        name: "Subtask",
        layout: "/admin",
        path: "/task-board/task/:id",
        visible: "no",
        icon: <Icon as={MdTask} width='20px' height='20px' color='inherit'/>,
        component: SubTask,
    },
    {
        name: "Task board",
        layout: "/admin",
        path: `/task-board/:usertoken/${userId}`,
        visible: "yes",
        icon: <Icon as={MdCheckCircle} width='20px' height='20px' color='inherit'/>,
        component: TodoDashboard,
    },
    {
        name: "Calendar",
        layout: "/admin",
        path: "/calendar",
        visible: "yes",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit'/>,
        component: Calendar,
    },
    {
        name: "Data Tables",
        layout: "/admin",
        path: "/data-tables",
        visible: "no",
        icon: <Icon as={MdBarChart} width='20px' height='20px'
                    color='inherit'/>,
        component: DataTables,
    },
    {
        name: "Profile",
        layout: "/admin",
        path: "/profile",
        visible: "no",
        icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit'/>,
        component: Profile,
    },
    {
        name: "Sign In",
        layout: "/auth",
        path: "/sign-in",
        visible: "no",
        icon: <Icon as={MdLock} width='20px' height='20px' color='inherit'/>,
        component: SignInCentered,
    },

];

export default routes;
