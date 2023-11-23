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
    Button,
    Progress,
    Modal,
    ModalOverlay,
    ModalContent,
    useColorModeValue,
    useColorMode
} from "@chakra-ui/react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import he from 'he';

import React, {useEffect} from "react";
import Tasks from "views/admin/subtaskDashboard/components/Tasks";

import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

// import data

import {useState, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";

export default function UserReports() {

    const userId = localStorage.getItem("userId");
    const [task, setTask] = useState([]);
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTaskTitle, setIsEditingTaskTitle] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const task_description = task.attributes ? task.attributes.description : "Loading...";
    const [isLoading, setIsLoading] = useState(false);
    const [dueDate, setDueDate] = useState(task.attributes ? task.attributes.due_date : new Date());
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("userToken") || !localStorage.getItem("userId")) {
            history.push(`/auth/sign-in`);
        }
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${userId}/tasks/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                const taskData = data["data"];
                if (taskData) {
                    const foundTask = taskData
                    if (foundTask) {
                        setTask(foundTask);
                        setDescription(foundTask.attributes.description);
                    } else {
                        console.log("Task not found");
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [id, userId]);

    const handleEditTitle = () => {
        if (task.attributes) {
            setTaskTitle(task.attributes.title); // Initialize the input with the current title
            setIsEditingTaskTitle(true); // Switch to editing mode
        }
    };

    // Handle the change of the title input
    const handleTitleChange = (event) => {
        setTaskTitle(event.target.value); // Update the title input state
    };

    // Handle the save of the edited title
    const handleSaveTitle = () => {
        if (taskTitle.trim() === "") {
            setTaskTitle("Untitled Task");
        }
        // Construct the request body with the updated title
        const requestBody = {
            data: {
                type: "TaskViewSet",
                id: id,
                attributes: {
                    ...task.attributes,
                    title: taskTitle.trim()
                }
            }
        }

        // Perform the API call to update the task title on the server
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${userId}/tasks/${id}/`, {
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
                setIsEditingTaskTitle(false);
            })
            .catch(error => {
                console.error('Failed to save the task title', error);
            });
    };

    // Handle the start of editing
    const handleEdit = () => {
        if (task.attributes) {
            setIsEditing(true); // Switch to editing mode
        }
    };
    // Handle the change of the input
    const handleDescriptionChange = (content, delta, source, editor) => {
        setDescription(editor.getHTML()); // ReactQuill provides the HTML content through the editor instance
    };

    const handleSave = () => {
        const encodedDescription = he.encode(description);
        if (encodedDescription === task.attributes.description) {
            setIsEditing(false);
            return;
        }
        if (encodedDescription.trim() === "") {
            setDescription("No description");
        }
        const requestBody = {
            data: {
                type: "TaskViewSet",
                id: id,
                attributes: {
                    ...task.attributes,
                    description: encodedDescription
                }
            }
        }

        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${userId}/tasks/${id}/`, {
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


    const loadData = () => {
        setIsLoading(true);
        const requestBody = {
            data: {
                type: "SummarizeViewSet",
                id: id,
                attributes: {
                    "text": plainTextDescription,
                    "task_id": id
                }
            }
        };

        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/summarize/${id}/`, {
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

    const handleEditDueDate = () => {
        setIsEditingDueDate(true);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleSaveDueDate = () => {
        // Construct the request body
        const requestBody = {
            data: {
                type: "TaskViewSet",
                id: id,
                attributes: {
                    ...task.attributes,
                    due_date: dueDate
                }
            }
        };

        // API call to update due date
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${userId}/tasks/${id}/`, {
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
                    setIsEditingDueDate(false);
                }
            })
            .catch(error => {
                console.error('Failed to save the due date', error);
            });
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

    function htmlToText(html) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    const descriptionParam = task.attributes ? task.attributes.description : "Loading...";

    const plainTextDescription = htmlToText(he.decode(descriptionParam));

    const dateInputRef = useRef(null);
    const titleColor = useColorModeValue("brand.800", "orange.500");
    const editTitleColor = useColorModeValue("red", "pink");
    const dueDateColor = useColorModeValue("red.600", "red.500");
    const taskSubjectColor = useColorModeValue("brand.600", "navy.200");
    const {colorMode} = useColorMode();
    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <simpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                {isLoading && <LoadingModal/>}
                <Flex mb='20px' mt='20px'>
                    {isEditingTaskTitle ? (
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={handleTitleChange}
                            color={editTitleColor}
                            style={{
                                fontSize: 'x-large',
                                fontWeight: 'bold',
                                color: colorMode === "light" ? "blue" : "lightyellow",
                                backgroundColor: 'transparent',
                                border: 'solid 1px',
                            }}
                        />
                    ) : (
                        <Text color={titleColor} fontSize='x-large'
                              fontWeight='bold'>
                            {task.attributes ? task.attributes.title : "Loading..."}
                        </Text>
                    )}
                </Flex>
                <Flex mb='20px'>
                    <Text color={taskSubjectColor} fontSize='xl'
                            fontWeight='bold'>
                        Course: &nbsp;
                    </Text>
                    <Text fontSize='xl'>
                        {task.attributes ? task.attributes.course : "Loading..."}
                    </Text>
                </Flex>
                <Flex mb='20px'>
                    {isEditingTaskTitle ? (
                        <Flex display='inline-flex'>
                            <Button onClick={handleSaveTitle}
                                    mr='10px'>Save</Button>
                            <Button
                                onClick={() => setIsEditingTaskTitle(false)}>Cancel</Button>
                        </Flex>
                    ) : (
                        <Button onClick={handleEditTitle}>Edit Task
                            Title</Button>
                    )}
                </Flex>
                <Flex mb='10px' flexDirection='column'>
                    <Text color={taskSubjectColor} fontSize='xl'
                          fontWeight='bold'>
                        Description: &nbsp;
                    </Text>
                    {isEditing ? (
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{__html: he.decode(task.attributes ? task.attributes.description : "Loading...")}}></div>
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
                    {isEditingDueDate ? (
                        <input
                            ref={dateInputRef}
                            type="date"
                            value={dueDate}
                            onChange={handleDueDateChange}
                            style={{
                                border: 'solid 1px',
                            }}
                        />
                    ) : (
                        <Text color={dueDateColor} fontSize='xl'
                              fontWeight='bold'>
                            {task.attributes ? task.attributes.due_date : "Loading..."}
                        </Text>
                    )}
                </Flex>
                <Flex mb='20px'>
                    {isEditingDueDate ? (
                        <Button onClick={handleSaveDueDate}>Save Due
                            Date</Button>
                    ) : (
                        <Button onClick={handleEditDueDate}>Edit Due
                            Date</Button>
                    )}
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
                    <Button onClick={loadData}
                            backgroundColor={useColorModeValue('navy.50', 'navy.600')}>
                        Summarize task
                    </Button>
                </Flex>
            </simpleGrid>
            <Tasks taskId={id}
                   task_description={plainTextDescription}
            />
            <FixedPlugin/>
        </Box>
    );
}
