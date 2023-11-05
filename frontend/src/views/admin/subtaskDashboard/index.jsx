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
    Text,
    Input,
    Button,
    Progress,
    Modal,
    ModalOverlay,
    ModalContent,
    useColorModeValue
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
                    } else {
                        console.log("Task not found");
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    // State to manage whether the description is being edited
    const [isEditing, setIsEditing] = useState(false);

    // State to manage the input value for the description
    const [description, setDescription] = useState("");

    // Handle the start of editing
    const handleEdit = () => {
        setDescription(task.attributes.description); // Set the current description into the state
        setIsEditing(true); // Switch to editing mode
    };

    // Handle the change of the input
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value); // Update the state with the input value
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        const requestBody = {
            data: {
                type: "TaskViewSet",
                id: id,
                attributes: {
                    ...task.attributes,
                    description
                }
            }
        }
        fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.api+json'
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data) {
                    setTask(data.data);
                } else {
                    console.log("No data found");
                }
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Failed to save the description', error);
            });
    };

    const [showSummary, setShowSummary] = useState(false); // State variable
    const task_description = task.attributes ? task.attributes.description : "Loading...";

    const loadData = () => {
        setIsLoading(true);
        const requestBody = {
            data: {
                type: "SummarizeViewSet",
                id: id,
                attributes: {
                    "text": task_description,
                    "task_id": id
                }
            }
        };

        fetch(`http://127.0.0.1:8000/api/summarize/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setTask(data.data);
                    setShowSummary(true);
                } else {
                    console.error('Failed to create the subtask', data.errors);
                }
            })
            .catch(error => console.error('Error:', error))
            .finally(() => setIsLoading(false));
    };

    const LoadingModal = () => (
        <Modal isOpen={isLoading} isCentered onClose={() => {
        }} closeOnOverlayClick={false}>
            <ModalOverlay/>
            <ModalContent>
                <Flex justifyContent="center" alignItems="center" p={6}
                      flexDirection="column">
                    <Text mb={4}>Loading</Text>
                    <Progress isIndeterminate width="100%"/>
                    <Text mt={4}>Please wait...</Text>
                </Flex>
            </ModalContent>
        </Modal>
    );

    const titleColor = useColorModeValue("brand.800", "orange.500");
    const dueDateColor = useColorModeValue("red.600", "red.500");
    const taskSubjectColor = useColorModeValue("brand.600", "navy.200");

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <simpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                {isLoading && <LoadingModal/>}
                <Flex mb='20px' mt='20px'>
                    <Text color={titleColor} fontSize='x-large' fontWeight='bold'>
                        {task.attributes ? task.attributes.title : "Loading..."}
                    </Text>
                </Flex>
                <Flex mb='10px' flexDirection='column'>
                    <Text color={taskSubjectColor} fontSize='xl'
                          fontWeight='bold'>
                        Description: &nbsp;
                    </Text>
                    {isEditing ? (
                        <Input
                            value={description}
                            textColor={taskSubjectColor}
                            onChange={handleDescriptionChange}
                            size="sm"
                        />
                    ) : (
                        <Text fontSize='xl' fontWeight='bold'>
                            {task.attributes ? task.attributes.description : "Loading..."}
                        </Text>
                    )}
                </Flex>
                <Flex mb='20px'>
                    {isEditing ? (
                        <Flex display='inline-flex'>
                            <Button
                                onClick={handleSave}
                                mr='10px'
                            >Save</Button>
                            <Button
                                onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Flex>
                    ) : (
                        <Button onClick={handleEdit}>Edit Description</Button>
                    )}
                </Flex>
                <Flex mb='10px'>
                    <Text color={taskSubjectColor} fontSize='xl'
                          fontWeight='bold'>
                        Due Date: &nbsp;
                    </Text>
                    <Text color={dueDateColor} fontSize='xl' fontWeight='bold'>
                        {task.attributes ? task.attributes.due_date : "Loading..."}
                    </Text>
                </Flex>

                {showSummary && (
                    <Flex mb='20px' flexDirection='column'>
                        <Text color={taskSubjectColor} fontSize='xl'
                              fontWeight='bold'>
                            Summarize: &nbsp;
                        </Text>
                        <Text fontSize='xl' fontWeight='bold'>
                            {task.attributes.summarized_text}
                        </Text>
                    </Flex>
                )}
                <Flex mb='20px'>
                    <Button onClick={loadData}>
                        Summarize task
                    </Button>
                </Flex>
            </simpleGrid>
            <Tasks taskId={id}
                   task_description={task.attributes ? task.attributes.description : "Loading..."}/>
            <FixedPlugin/>
        </Box>
    );
}
