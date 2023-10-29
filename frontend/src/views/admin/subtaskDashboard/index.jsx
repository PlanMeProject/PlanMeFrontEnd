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
    Box,
    Flex,
    SimpleGrid,
    Text,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

import PieCard from "views/admin/subtaskDashboard/components/PieCard";
import Tasks from "views/admin/subtaskDashboard/components/Tasks";

import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

// import data
import mockData from "../../admin/datas/mock.json"
import {useParams} from "react-router-dom";
import {useState} from "react";

export default function UserReports() {

    const userID = 1; // Replace with user ID
    const userData = mockData["users"].find(user => user.id === userID);
    const {id} = useParams(); // Replace with task ID
    const task = userData["tasks"].find(task => task.id === parseInt(id));

    const [showSummary, setShowSummary] = useState(false); // State variable

    const loadData = () => {
        // Simulate data retrieval here. Replace with actual data fetching logic
        // Set state variable to true to show summarized_text
        setShowSummary(true);
    };

    const titleColor = useColorModeValue("brand.800", "orange.500");
    const dueDateColor = useColorModeValue("red.600", "red.500");
    const taskSubjectColor = useColorModeValue("brand.600", "navy.200");

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <simpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <Flex mb='20px' mt='20px'>
                    <Text color={titleColor} fontSize='x-large' fontWeight='bold'>
                        {task.title}
                    </Text>
                </Flex>
                <Flex mb='20px'>
                    <Text color={taskSubjectColor} fontSize='xl'
                          fontWeight='bold'>
                        Description: &nbsp;
                    </Text>
                    <Text fontSize='xl' fontWeight='bold'>
                        {task.description}
                    </Text>
                </Flex>
                <Flex mb='20px'>
                    <Text color={taskSubjectColor} fontSize='xl'
                          fontWeight='bold'>
                        Due Date: &nbsp;
                    </Text>
                    <Text color={dueDateColor} fontSize='xl' fontWeight='bold'>
                        {task.due_date}
                    </Text>
                </Flex>
                {/* Button to toggle summarized_text visibility */}
                {/* Conditionally render summarized_text */}
                {showSummary && (
                    <Flex mb='20px'>
                        <Text color={taskSubjectColor} fontSize='xl'
                              fontWeight='bold'>
                            Summarize: &nbsp;
                        </Text>
                        <Text fontSize='xl' fontWeight='bold'>
                            {task.summarized_text}
                        </Text>
                    </Flex>
                )}
                <Flex mb='20px'>
                    <Button onClick={loadData}>
                        Summarize task
                    </Button>
                </Flex>
            </simpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <Tasks/>
                <PieCard/>
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
