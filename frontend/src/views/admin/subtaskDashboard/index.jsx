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

import React, {useEffect} from "react";
import Tasks from "views/admin/subtaskDashboard/components/Tasks";

import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

// import data

import {useState} from "react";
import {useParams} from "react-router-dom";

export default function UserReports() {

    const [task, setTask] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        // Your API endpoint
        fetch("http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/")
            .then((response) => response.json())
            .then((data) => {
                const taskData = data["data"];
                if (taskData) {
                    const foundTask = taskData.find(task => task.id === id);
                    if (foundTask) {
                        setTask(foundTask);
                    }
                    else {
                        console.log("Task not found");
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

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
            <Tasks/>
            <FixedPlugin/>
        </Box>
    );
}
