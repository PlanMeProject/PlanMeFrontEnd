// Chakra imports
import {
    Box,
    Flex,
    Icon,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import TodoCard from "./components/TodoCard";
import IconBox from "components/icons/IconBox";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import React, {useEffect, useState} from "react";
import {
    MdAddTask,
} from "react-icons/md";


export default function UserReports() {
    const textColor = useColorModeValue("navy.700", "gray.200");
    const todoCardColor = useColorModeValue("#FFE999", "#FFDE6A");
    const inProgressCardColor = useColorModeValue("#CDC5FF", "#8F7CFF");
    const doneCardColor = useColorModeValue("#9EEECC", "#51EFAD");

    const [task, setTask] = useState([]);
    const [numTodo, setNumTodo] = useState(0);
    const [numInProgress, setNumInProgress] = useState(0);
    const [numCompleted, setNumCompleted] = useState(0);

    const [draggedTask, setDraggedTask] = useState(null);

    // Example of onDragStart function in UserReports component
    const handleDragStart = (event, task) => {
        event.dataTransfer.setData("text/plain", task.id.toString()); // Set the drag data to the task's id
        setDraggedTask(task); // Update the state to reflect the currently dragged task
    };

    // This function will be called when the drag is over a drop zone
    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow a drop
    };

    // This function will be called when the task is dropped
    const handleDrop = (newStatus, event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        if (taskId) {
            // Find the current task to get its current status
            const currentTask = task.find(t => t.id === taskId);

            if (!currentTask) {
                console.error("Task not found: ", taskId);
                return;
            }

            const oldStatus = currentTask.attributes.status;

            // Create the request body with the new status
            const requestBody = {
                data: {
                    type: "TaskViewSet",
                    id: taskId,
                    attributes: {
                        status: newStatus
                    }
                }
            };

            // Perform the API call to update the status on the server
            fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.json();
                })
                .then(data => {
                    // On success, update the local state to reflect the new status
                    setTask(prevTasks => prevTasks.map(t => t.id === taskId ? {
                        ...t,
                        attributes: {...t.attributes, status: newStatus}
                    } : t));

                    // Update task counters accordingly
                    if (oldStatus !== newStatus) { // Only update counters if the status has changed
                        setNumTodo(prev => oldStatus === 'Todo' ? prev - 1 : newStatus === 'Todo' ? prev + 1 : prev);
                        setNumInProgress(prev => oldStatus === 'In progress' ? prev - 1 : newStatus === 'In progress' ? prev + 1 : prev);
                        setNumCompleted(prev => (oldStatus === 'Completed' || oldStatus === 'Complete') ? prev - 1 : (newStatus === 'Completed' || newStatus === 'Complete') ? prev + 1 : prev);
                    }
                })
                .catch((error) => {
                    console.error('Error updating task status:', error);
                });
        }
    };


    useEffect(() => {
        // Your API endpoint
        fetch("http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/")
            .then((response) => response.json())
            .then((data) => {
                const taskData = data["data"];
                if (taskData) {
                    setTask(taskData);
                    setNumTodo(taskData.filter(task => task.attributes.status === 'Todo').length);
                    setNumInProgress(taskData.filter(task => task.attributes.status === 'In progress').length);
                    setNumCompleted(taskData.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete').length);
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}} gap='20px'
                        mb='20px'>
                <Flex alignContent='center' justifyContent='space-between'
                      padding='0 15px 0 15px'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Text fontSize='2xl' fontWeight='bold'
                              backgroundColor='white'
                              padding={numTodo===1? '0px 14px 0px 14px': '0px 11px 0px 11px'}
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numTodo}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>
                            Todo
                        </Text>
                    </div>
                </Flex>
                <Flex alignContent='center' justifyContent='space-between'
                      padding='0 15px 0 15px'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Text fontSize='2xl' fontWeight='bold'
                              backgroundColor='white'
                              padding={numInProgress===1? '0px 14px 0px 14px': '0px 11px 0px 11px'}
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numInProgress}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>
                            In progress
                        </Text>
                    </div>
                </Flex>
                <Flex alignContent='center' justifyContent='space-between'
                      padding='0 15px 0 15px'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Text fontSize='2xl' fontWeight='bold'
                              backgroundColor='white'
                              padding={numCompleted===1? '0px 14px 0px 14px': '0px 11px 0px 11px'}
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numCompleted}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>
                            Complete
                        </Text>
                    </div>
                </Flex>
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}} gap='20px'
                        mb='20px'>
                <div
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop('Todo', event)}
                    style={{minHeight: '1px'}} // This is to ensure the drop zone is always available
                >
                    <TodoCard
                        onDragStart={handleDragStart}
                        cardColor={todoCardColor}
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdAddTask}
                                            color='white'/>}
                            />
                        }
                        name='New Tasks'
                        value='Todo'
                        task={task.filter(task => task.attributes.status === 'Todo')}
                    />
                </div>
                <div
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop('In progress', event)}
                    style={{minHeight: '1px'}} // This is to ensure the drop zone is always available
                >
                    <TodoCard
                        onDragStart={handleDragStart}
                        cardColor={inProgressCardColor}
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdAddTask}
                                            color='white'/>}
                            />
                        }
                        name='New Tasks'
                        value='In Progress'
                        task={task.filter(task => task.attributes.status === 'In progress')}
                    />
                </div>
                <div
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop('Completed', event)}
                    style={{minHeight: '1px'}} // This is to ensure the drop zone is always available
                >
                    <TodoCard
                        onDragStart={handleDragStart}
                        cardColor={doneCardColor}
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdAddTask}
                                            color='white'/>}
                            />
                        }
                        name='New Tasks'
                        value='Completed'
                        task={task.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete')}
                    />
                </div>
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
