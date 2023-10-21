/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
    // Avatar,
    Box,
    Flex,
    // FormLabel,
    // Icon,
    // Select,
    SimpleGrid,
    Text,
    // useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import Usa from "assets/img/dashboards/usa.png";
// Custom components
// import MiniCalendar from "components/calendar/MiniCalendar";
// import MiniStatistics from "components/card/MiniStatistics";
// import IconBox from "components/icons/IconBox";
import React from "react";
// import {
//     MdAddTask,
//     MdAttachMoney,
//     MdBarChart,
//     MdFileCopy,
// } from "react-icons/md";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/subtaskDashboard/components/Tasks";
// import TotalSpent from "views/admin/default/components/TotalSpent";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import {
//     columnsDataCheck,
//     columnsDataComplex,
// } from "views/admin/default/variables/columnsData";
// import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
// import tableDataComplex
//     from "views/admin/default/variables/tableDataComplex.json";
import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

export default function UserReports() {
    // Chakra Color Mode
    // const brandColor = useColorModeValue("brand.500", "white");
    // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Flex mb='20px' mt='20px'>
                <Text fontSize='xl' fontWeight='bold'>Task name</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>Subject</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>Description</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>Due Date</Text>
            </Flex>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <Tasks/>
                <PieCard/>
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
