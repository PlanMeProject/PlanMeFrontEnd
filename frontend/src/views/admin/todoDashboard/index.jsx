// Chakra imports
import {
    Box, Checkbox,
    Flex,
    FormHelperText,
    Icon,
    IconButton,
    SimpleGrid,
    Text,
    useColorModeValue, VStack,
} from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    // other imports...
} from "@chakra-ui/react";

import {
    Input,
    Textarea,
    Select,
    FormControl,
    FormLabel,
    DatePicker,
} from "@chakra-ui/react";

import TodoCard from "./components/TodoCard";
import IconBox from "components/icons/IconBox";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {MdAddTask} from "react-icons/md";
import {AddIcon} from "@chakra-ui/icons";


export default function UserReports() {
    const textColor = useColorModeValue("navy.700", "gray.200");
    const todoCardColor = useColorModeValue("#FFE999", "#FFDE6A");
    const inProgressCardColor = useColorModeValue("#CDC5FF", "#8F7CFF");
    const doneCardColor = useColorModeValue("#9EEECC", "#51EFAD");
    const iconColor = useColorModeValue('secondaryGray', 'secondaryGray.200');
    const selectSubBtColor = useColorModeValue('#ff9393', 'red.500');

    const { token, user_id: userId } = useParams();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [tempSelectedSubjects, setTempSelectedSubjects] = useState([]);

    useEffect(() => {
        console.log(token);
        console.log(selectedSubjects);
    }, [selectedSubjects]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify({
                data: {
                    type: "CoursesViewSet",
                    attributes: {
                        access_token: token
                    }
                }
            }),
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text)
                });
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data.data.map(s => s.title.name));
            setAvailableSubjects(data.data.map(s => s.title.name));
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [token]);

    const openSubjectModal = () => {
        setTempSelectedSubjects(selectedSubjects); // Initialize temporary selections
        setIsSubjectModalOpen(true);
    };

    const handleSubjectChange = (subject) => {
        setTempSelectedSubjects(prev => {
            if (prev.includes(subject)) {
                return prev.filter(s => s !== subject);
            } else {
                return [...prev, subject];
            }
        });
    };

    const saveSelectedSubjects = () => {
        setSelectedSubjects(tempSelectedSubjects);
        setIsSubjectModalOpen(false);
    };

    const [task, setTask] = useState([]);
    const [numTodo, setNumTodo] = useState(0);
    const [numInProgress, setNumInProgress] = useState(0);
    const [numCompleted, setNumCompleted] = useState(0);
    const [draggedTask, setDraggedTask] = useState(null);

    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const handleAddTaskClick = () => {
        openModal();
    };

    const addTask = (userId, newTaskDetails) => {
        fetch(`http://127.0.0.1:8000/api/users/${userId}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify({
                data: {
                    type: "TaskViewSet",
                    attributes: newTaskDetails
                }
            }),
        })
            .then(response => {
                if (!response.ok) {
                    // Log more detailed information for debugging
                    return response.text().then(text => {
                        throw new Error(text)
                    });
                }
                return response.json();
            })
            .then(data => {
                const updatedTasks = [...task, data.data];
                setTask(updatedTasks);
                setNumTodo(updatedTasks.filter(task => task.attributes.status === 'Todo').length);
                setNumInProgress(updatedTasks.filter(task => task.attributes.status === 'In progress').length);
                setNumCompleted(updatedTasks.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete').length);
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };


    // Example function to handle form submission
    const handleFormSubmit = () => {
        if (!taskTitle.trim() || !description.trim() || !dueDate.trim() || !status.trim()) {
            return;
        }
        const userId = 'f6084d8f-3a96-4288-b18f-fc174ce13b01'; // Replace with actual user ID
        const newTaskDetails = {
            title: taskTitle,
            description: description,
            summarized_text: "summaries text",
            due_date: dueDate,
            status: status,
        };
        addTask(userId, newTaskDetails);
        closeModal(); // Close the modal after submitting
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleDeleteTask = (taskId) => {
        // Perform the DELETE request
        fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setTask(currentTasks => {
                        const updatedTasks = currentTasks.filter(t => t.id !== taskId);

                        // Immediately update the counters based on the updated tasks array
                        setNumTodo(updatedTasks.filter(task => task.attributes.status === 'Todo').length);
                        setNumInProgress(updatedTasks.filter(task => task.attributes.status === 'In progress').length);
                        setNumCompleted(updatedTasks.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete').length);

                        return updatedTasks;
                    });
                } else {
                    console.error('Failed to delete the task');
                }
            })
            .catch(error => console.error('Error:', error));
    };


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
                    // setTask(taskData.filter(task => task.attributes.subject in selectedSubjects));
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
            <Button mb='10px' backgroundColor={selectSubBtColor} onClick={openSubjectModal}>Select Courses</Button>
            <Modal isOpen={isSubjectModalOpen}
                   onClose={() => setIsSubjectModalOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Select Courses</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack align="stretch" spacing={3}>
                            {availableSubjects.map((subject, index) => (
                                <Checkbox
                                    key={index}
                                    isChecked={tempSelectedSubjects.includes(subject)}
                                    onChange={() => handleSubjectChange(subject)}
                                >
                                    {subject}
                                </Checkbox>
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}
                                onClick={saveSelectedSubjects}>
                            Save Selection
                        </Button>
                        <Button variant="ghost"
                                onClick={() => setIsSubjectModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}} gap='20px'
                        mb='20px'>
                {/* Group for 'Todo' */}
                <Box>
                    <Flex alignContent='center' justifyContent='space-between'
                          padding='0 15px 0 15px' mb='15px'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Text fontSize='2xl' fontWeight='bold'
                                  backgroundColor='white'
                                  padding={numTodo === 1 ? '0px 14px 0px 14px' : '0px 11px 0px 11px'}
                                  borderRadius='50px'
                                  boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                  color='navy.700'>
                                {numTodo}
                            </Text>
                            <Text fontSize='2xl' fontWeight='bold' ml='10px'
                                  color={textColor}>
                                Todo
                            </Text>
                            <IconButton aria-label="Add Task" color={iconColor}
                                        icon={<AddIcon/>} size='sm' ml='auto'
                                        onClick={handleAddTaskClick}
                            />
                        </div>
                    </Flex>
                    <div onDragOver={handleDragOver}
                         onDrop={(event) => handleDrop('Todo', event)}
                         style={{minHeight: '1px'}}>
                        <TodoCard
                            onDelete={handleDeleteTask}
                            onDragStart={handleDragStart}
                            cardColor={todoCardColor}
                            name='New Tasks'
                            value='Todo'
                            task={task.filter(task => task.attributes.status === 'Todo')}
                        />
                    </div>
                </Box>

                {/* Group for 'In Progress' */}
                <Box>
                    <Flex alignContent='center' justifyContent='space-between'
                          padding='0 15px 0 15px' mb='15px'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Text fontSize='2xl' fontWeight='bold'
                                  backgroundColor='white'
                                  padding={numInProgress === 1 ? '0px 14px 0px 14px' : '0px 11px 0px 11px'}
                                  borderRadius='50px'
                                  boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                  color='navy.700'>
                                {numInProgress}
                            </Text>
                            <Text fontSize='2xl' fontWeight='bold' ml='10px'
                                  color={textColor}>
                                In Progress
                            </Text>
                            <IconButton aria-label="Add Task" color={iconColor}
                                        icon={<AddIcon/>} size='sm' ml='auto'
                                        onClick={handleAddTaskClick}
                            />
                        </div>
                    </Flex>
                    <div onDragOver={handleDragOver}
                         onDrop={(event) => handleDrop('In progress', event)}
                         style={{minHeight: '1px'}}>
                        <TodoCard
                            onDelete={handleDeleteTask}
                            onDragStart={handleDragStart}
                            cardColor={inProgressCardColor}
                            startContent={
                                <IconBox w='56px' h='56px'
                                         bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                         icon={<Icon w='28px' h='28px'
                                                     as={MdAddTask}
                                                     color='white'/>}
                                />
                            }
                            name='New Tasks'
                            value='In Progress'
                            task={task.filter(task => task.attributes.status === 'In progress')}
                        />
                    </div>
                </Box>

                {/* Group for 'Completed' */}
                <Box>
                    <Flex alignContent='center' justifyContent='space-between'
                          padding='0 15px 0 15px' mb='15px'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Text fontSize='2xl' fontWeight='bold'
                                  backgroundColor='white'
                                  padding={numCompleted === 1 ? '0px 14px 0px 14px' : '0px 11px 0px 11px'}
                                  borderRadius='50px'
                                  boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                                  color='navy.700'>
                                {numCompleted}
                            </Text>
                            <Text fontSize='2xl' fontWeight='bold' ml='10px'
                                  color={textColor}>
                                Completed
                            </Text>
                            <IconButton aria-label="Add Task" color={iconColor}
                                        icon={<AddIcon/>} size='sm' ml='auto'
                                        onClick={handleAddTaskClick}
                            />
                        </div>
                    </Flex>
                    <div onDragOver={handleDragOver}
                         onDrop={(event) => handleDrop('Completed', event)}
                         style={{minHeight: '1px'}}>
                        <TodoCard
                            onDelete={handleDeleteTask}
                            onDragStart={handleDragStart}
                            cardColor={doneCardColor}
                            startContent={
                                <IconBox w='56px' h='56px'
                                         bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                         icon={<Icon w='28px' h='28px'
                                                     as={MdAddTask}
                                                     color='white'/>}
                                />
                            }
                            name='New Tasks'
                            value='Completed'
                            task={task.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete')}
                        />
                    </div>
                </Box>
            </SimpleGrid>
            <FixedPlugin/>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add New Task</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Task Title</FormLabel>
                            <Input
                                color={textColor}
                                placeholder="Task Title"
                                value={taskTitle}
                                isInvalid={taskTitle === ""}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                            {taskTitle === "" &&
                                <FormHelperText color="red.500">Title is
                                    required</FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                color={textColor}
                                placeholder="Description"
                                value={description}
                                isInvalid={description === ""}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {description === "" &&
                                <FormHelperText color="red.500">Description is
                                    required</FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Due Date</FormLabel>
                            <Input
                                color={textColor}
                                type="date"
                                value={dueDate}
                                isInvalid={dueDate === ""}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                            {dueDate === "" &&
                                <FormHelperText color="red.500">Due date is
                                    required</FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder="Select status"
                                value={status}
                                isInvalid={status === ""}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Todo">Todo</option>
                                <option value="In progress">In progress
                                </option>
                                <option value="Completed">Completed</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}
                                onClick={handleFormSubmit}>
                            Add Task
                        </Button>
                        <Button variant="ghost"
                                onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
