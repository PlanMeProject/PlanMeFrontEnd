// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

import TodoCard from "./components/TodoCard";
import IconBox from "components/icons/IconBox";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import React, {useEffect, useState} from "react";
import {MdAddTask} from "react-icons/md";
import {AddIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";


export default function UserReports() {
    const textColor = useColorModeValue("navy.700", "gray.200");
    const todoCardColor = useColorModeValue("#FFE999", "#FFDE6A");
    const inProgressCardColor = useColorModeValue("#CDC5FF", "#8F7CFF");
    const doneCardColor = useColorModeValue("#9EEECC", "#51EFAD");
    const iconColor = useColorModeValue('secondaryGray', 'secondaryGray.200');
    const selectSubBtColor = useColorModeValue('#ff9393', 'red.500');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [tempSelectedSubjects, setTempSelectedSubjects] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [filterSelection, setFilterSelection] = useState("notCheck");
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNoTasks, setIsNoTasks] = useState(false);
    const [message, setMessage] = useState("");

    const [storedToken, setStoredToken] = useState(localStorage.getItem('userToken'));
    const [storedUserId, setStoredUserId] = useState(localStorage.getItem('userId'));
    const [storedSelectedSubjects, setStoredSelectedSubjects] = useState(
        localStorage.getItem('selectedSubjects') ? JSON.parse(localStorage.getItem('selectedSubjects')) : []
    );

    const history = useHistory();
    useEffect(() => {
        const handleStorageChange = () => {
            setStoredToken(localStorage.getItem('userToken'));
            setStoredUserId(localStorage.getItem('userId'));
            setStoredSelectedSubjects(
                localStorage.getItem('selectedSubjects') ? JSON.parse(localStorage.getItem('selectedSubjects')) : []
            );
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('selectedSubjects');
        history.push('/auth/sign-in');
    }


    useEffect(() => {
        console.log("task board");
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify({
                data: {
                    type: "CoursesViewSet",
                    attributes: {
                        access_token: storedToken
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
            setAllCourses(data.data);
            setAvailableSubjects(data.data.map(s => s.title.name));
            console.log("Successfully Set Course:", data.data);
        }).catch(error => {
            handleLogout();
            console.error('Error:', error);
        });
    }, [storedToken]);

    const openSubjectModal = () => {
        setTempSelectedSubjects(selectedSubjects);
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
        if (tempSelectedSubjects.length === 0) {
            setSelectedCourses([]);
            setAssignments([]);
            setIsSubjectModalOpen(false);
            return;
        }
        localStorage.setItem("selectedSubjects", JSON.stringify(tempSelectedSubjects));
        const selectedCourses = allCourses.filter(c => tempSelectedSubjects.includes(c.title.name));
        setSelectedCourses(selectedCourses);
        getAssignments(selectedCourses);
        setIsSubjectModalOpen(false);
    };

    const getAssignments = (selectedCourses) => {
        setIsLoading(true);
        const body = {
            data: {
                type: "AssignmentsViewSet",
                attributes: {
                    user_id: storedUserId,
                    check_status: "checked",
                    access_token: storedToken,
                    all_courses: {
                        data: selectedCourses
                    }
                }
            }
        };
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/assignments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(body),
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text)
                });
            }
            return response.json();
        }).then(data => {
            console.log("Done get assignment")
            setAssignments(data.data);
            setIsLoading(false);
        }).catch(error => {
            setMessage("You have selected a course that you are not a student.");
            setIsNoTasks(true);
            setIsLoading(false);
            console.error('Error:', error);
        });
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
    const [courseAdded, setCourseAdded] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const handleAddTaskClick = () => {
        openModal();
    };

    const addTask = (storedUserId, newTaskDetails) => {
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${storedUserId}/tasks/`, {
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
                console.log("Successfully Create Task:", data.data);
            })
            .catch(error => {
                handleLogout();
                console.error('Error adding task:', error);
            });
    };


    // Example function to handle form submission
    const handleFormSubmit = () => {
        if (!taskTitle.trim() || !description.trim() || !dueDate.trim() || !status.trim() || !courseAdded.trim()) {
            return;
        }
        const newTaskDetails = {
            title: taskTitle,
            description: description,
            summarized_text: "summaries text",
            due_date: dueDate,
            status: status,
            course: courseAdded
        };
        addTask(storedUserId, newTaskDetails);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleDeleteTask = (taskId) => {
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${storedUserId}/tasks/${taskId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setTask(currentTasks => {
                        const updatedTasks = currentTasks.filter(t => t.id !== taskId);
                        setNumTodo(updatedTasks.filter(task => task.attributes.status === 'Todo').length);
                        setNumInProgress(updatedTasks.filter(task => task.attributes.status === 'In progress').length);
                        setNumCompleted(updatedTasks.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete').length);
                        console.log("Successfully Deleted Task:", taskId);
                        return updatedTasks;
                    });
                } else {
                    console.error('Failed to delete the task');
                }
            })
            .catch(error => {
                handleLogout();
                console.error('Error:', error);
            });
    };


    const handleDragStart = (event, task) => {
        event.dataTransfer.setData("text/plain", task.id.toString()); // Set the drag data to the task's id
        setDraggedTask(task);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (newStatus, event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        if (taskId) {
            const currentTask = task.find(t => t.id === taskId);

            if (!currentTask) {
                console.error("Task not found: ", taskId);
                return;
            }

            const oldStatus = currentTask.attributes.status;

            const requestBody = {
                data: {
                    type: "TaskViewSet",
                    id: taskId,
                    attributes: {
                        status: newStatus
                    }
                }
            };

            fetch(`https://planme-3366bb9023b7.herokuapp.com/api/users/${storedUserId}/tasks/${taskId}/`, {
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
                    if (oldStatus !== newStatus) {
                        setNumTodo(prev => oldStatus === 'Todo' ? prev - 1 : newStatus === 'Todo' ? prev + 1 : prev);
                        setNumInProgress(prev => oldStatus === 'In progress' ? prev - 1 : newStatus === 'In progress' ? prev + 1 : prev);
                        setNumCompleted(prev => (oldStatus === 'Completed' || oldStatus === 'Complete') ? prev - 1 : (newStatus === 'Completed' || newStatus === 'Complete') ? prev + 1 : prev);
                        console.log("Successfully Updated Task Status:", taskId);
                    }
                })
                .catch((error) => {
                    handleLogout();
                    console.error('Error updating task status:', error);
                });
        }
    };

    useEffect(() => {

        if (storedSelectedSubjects === null) {
            return;
        }

        const courseParams = storedSelectedSubjects.map(course => `courses=${encodeURIComponent(course)}`).join('&');
        const fetchURL = `https://planme-3366bb9023b7.herokuapp.com/api/users/${storedUserId}/tasks/?user_id=${storedUserId}&${courseParams}`;

        // Your API endpoint
        fetch(fetchURL)
            .then((response) => response.json())
            .then((data) => {
                const taskData = data["data"];
                if (taskData) {
                    setTask(taskData);
                    if (taskData.length === 0) {
                        setMessage("No tasks found for the selected courses or you do not selected any course yet.");
                        setIsNoTasks(true);
                    } else {
                        setIsNoTasks(false);
                    }
                    setNumTodo(taskData.filter(task => task.attributes.status === 'Todo').length);
                    setNumInProgress(taskData.filter(task => task.attributes.status === 'In progress').length);
                    setNumCompleted(taskData.filter(task => task.attributes.status === 'Completed' || task.attributes.status === 'Complete').length);
                    console.log("Successfully Set Task:", taskData);
                }
            })
            .catch((error) => {
                handleLogout();
                console.error("Error fetching data: ", error);
            })
    }, [assignments]);

    const LoadingModal = () => (
        <Modal isOpen={isLoading} isCentered onClose={() => {
        }} closeOnOverlayClick={false}>
            <ModalOverlay/>
            <ModalContent>
                <Flex justifyContent="center" alignItems="center" p={6}
                      flexDirection="column">
                    <Text mb={4}>Loading your tasks</Text>
                    <Progress isIndeterminate width="100%"/>
                    <Text mt={4}>This might take a few minutes...especially if
                        you selected many courses</Text>
                </Flex>
            </ModalContent>
        </Modal>
    );

        const isValidDate = (dateStr) => {
        const currentYear = new Date().getFullYear();
        const year = new Date(dateStr).getFullYear();
        return year >= currentYear && year <= 9999;
    };


    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Button mb='10px' backgroundColor={selectSubBtColor}
                    onClick={openSubjectModal}>Select Courses</Button>
            {isNoTasks && <Text color={textColor} mb='20px'>{message}</Text>}
            {/* Loading Modal */}
            {isLoading && <LoadingModal/>}
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
                                isInvalid={dueDate === "" || !isValidDate(dueDate)}
                                onChange={(e) => {
                                    if (isValidDate(e.target.value)) {
                                        setDueDate(e.target.value);
                                    }
                                }}
                            />
                            {(dueDate === "" || !isValidDate(dueDate)) && (
                                <FormHelperText color="red.500">
                                    {dueDate === "" ? "Due date is required" : "Please enter a valid date (between current year and 2100)"}
                                </FormHelperText>
                            )}
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
                        <FormControl mt={4}>
                            <FormLabel>Course</FormLabel>
                            <Select
                                placeholder="Select course"
                                value={courseAdded}
                                isInvalid={courseAdded === ""}
                                onChange={(e) => setCourseAdded(e.target.value)}
                            >
                                {storedSelectedSubjects.map((course) => {
                                    return <option
                                        value={course}>{course}</option>
                                })
                                }
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
