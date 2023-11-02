// Chakra imports
import {
    Box,
    Flex,
    Text,
    Icon,
    useColorModeValue,
    Checkbox, FormHelperText, Select,
    SimpleGrid
} from "@chakra-ui/react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import PieCard from "./PieCard.js";
import IconBox from "components/icons/IconBox";

import {useEffect, useState} from "react";
// Assets
import {MdDelete, MdAssignment, MdAdd} from "react-icons/md";
import React from "react";

export default function Conversion(props) {

    const {...rest} = props;
    const {taskId} = props;

    const [subtasks, setSubtasks] = useState([]);
    // const [showSubtasks, setShowSubtasks] = useState(false);
    // const [isDataLoaded, setDataLoaded] = useState(false); // State variable to track if data is loaded

    const [isOpen, setIsOpen] = useState(false);
    const [newSubtask, setNewSubtask] = useState({
        title: '',
        status: 'Incomplete'
    });

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}/subtasks`)
            .then((response) => response.json())
            .then((data) => {
                const subtaskData = data['data'];
                if (subtaskData) {
                    setSubtasks(subtaskData);
                    console.log("Subtask data loaded", subtaskData);
                } else {
                    console.log("No subtask data");
                }
            })
            .catch((error) => {
                    console.error("Error fetching data: ", error);
                }
            );
    }, []);

    const [showSubtasks, setShowSubtasks] = useState(false);
    const handleShowSubtasks = () => {
        setShowSubtasks(true);
    }


    const [taskData, setTaskData] = useState([0, 0]); // [Complete, In Progress]
    useEffect(() => {
        const totalSubtasks = subtasks.length;
        const completedSubtasks = subtasks.filter(task => task.attributes.status === 'Complete').length;

        if (totalSubtasks > 0) {
            const completedPercentage = (completedSubtasks / totalSubtasks) * 100;
            const inProgressPercentage = 100 - completedPercentage;

            setTaskData([Math.round(completedPercentage), Math.round(inProgressPercentage)]);
        }
    }, [subtasks]);

    // Modal functions for opening and closing the modal
    const handleSubmit = () => {
    if (newSubtask.title === "") {
        return;
    }

    const requestBody = {
        data: {
            type: "SubTaskViewSet", // Use the correct type for a subtask, if it's different
            attributes: {
                ...newSubtask
            }
        }
    };

    fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}/subtasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            // Include other headers like authorization if needed
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.errors) {
            // Assuming the server responds with the newly created subtask,
            // which includes the new ID assigned by the server
            const newSubtask = data.data ? data.data : data;
            setSubtasks([...subtasks, newSubtask]);
            setIsOpen(false);
            setNewSubtask({title: '', status: 'Todo'}); // Reset the form
        } else {
            // Handle any errors returned by the server
            console.error('Failed to create the subtask', data.errors);
        }
    })
    .catch(error => console.error('Error:', error));
};


    // Delete function
    const handleDelete = (subtaskId) => {
        // Perform the DELETE request
        fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}/subtasks/${subtaskId}/`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Remove the subtask from the local state if the DELETE was successful
                    const updatedSubtasks = subtasks.filter(task => task.id !== subtaskId);
                    setSubtasks(updatedSubtasks);
                } else {
                    console.error('Failed to delete the subtask');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCheckboxChange = (subtaskId, isChecked) => {
        const newStatus = isChecked ? 'Complete' : 'Todo';
        const updatedSubtask = subtasks.find(task => task.id === subtaskId);

        if (updatedSubtask) {
            const requestBody = {
                data: {
                    type: "SubTaskViewSet", // Adjust if needed to match the type your API expects
                    id: updatedSubtask.id, // Ensure this is the correct ID for the subtask
                    attributes: {
                        // ...updatedSubtask.attributes,
                        status: newStatus,
                    }
                }
            };

            fetch(`http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/${taskId}/subtasks/${subtaskId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    // Include other headers like authorization if needed
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json()) // Convert the response to JSON
                .then(data => {
                    if (data && !data.errors) { // Assuming 'errors' would be part of an unsuccessful response
                        // Update the subtask's status in the local state if the PUT was successful
                        setSubtasks(subtasks.map(task =>
                            task.id === subtaskId ? {...task,
                                attributes: {
                                    ...task.attributes,
                                    status: newStatus
                                }
                            } : task
                        ));
                    } else {
                        // Handle any errors returned by the server
                        console.error('Failed to update the subtask', data.errors);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };


    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
    const brandColor = useColorModeValue("brand.500", "orange.500");
    return (
        <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
            <Card p='20px' align='center' direction='column'
                  w='100%' {...rest}>
                <Flex alignItems='center' w='100%' mb='30px'>
                    <IconBox
                        me='12px'
                        w='38px'
                        h='38px'
                        bg={boxBg}
                        icon={<Icon as={MdAssignment} color={brandColor}
                                    w='24px'
                                    h='24px'/>}
                    />
                    <Text color={textColor} fontSize='lg' fontWeight='700'>
                        Subtasks
                    </Text>
                    {/* Button to toggle subtask visibility */}
                    <Flex display='inline-flex' ml='auto' alignItems='center'>
                        <Button mr='10px' onClick={handleShowSubtasks}>
                            Generate
                        </Button>
                        <Icon
                            ms='auto'
                            mr='10px'
                            as={MdAdd}
                            color='green.300'
                            w='24px'
                            h='24px'
                            cursor='pointer'
                            onClick={() => setIsOpen(true)}
                        />
                    </Flex>

                </Flex>
                {/* Add this Modal JSX */}
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalOverlay/>
                    <ModalContent backgroundColor={boxBg}>
                        <ModalHeader>Add a new subtask</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    placeholder="Subtask title"
                                    value={newSubtask.title}
                                    onChange={(e) => setNewSubtask({
                                        ...newSubtask,
                                        title: e.target.value
                                    })}
                                    isInvalid={newSubtask.title === ""}
                                    color={textColor}
                                />
                                {newSubtask.title === "" &&
                                    <FormHelperText color="red.500">Title is
                                        required</FormHelperText>}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    placeholder="Select status"
                                    value={newSubtask.status}
                                    onChange={(e) => setNewSubtask({
                                        ...newSubtask,
                                        status: e.target.value
                                    })}
                                >
                                    <option value="Todo">Todo
                                    </option>
                                    <option value="Complete">Completed
                                    </option>
                                </Select>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3}
                                    onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button
                                onClick={() => setIsOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Box px='11px'>
                    {subtasks.map((task, index) => (
                        <Flex key={index} mb='20px'>
                            <Checkbox me='16px' colorScheme='brandScheme'
                                      isChecked={task.attributes && task.attributes.status === 'Complete'}
                                      onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                            />
                            <Text fontWeight='bold' color={textColor}
                                  fontSize='md'
                                  textAlign='start'
                                  onClick={() => handleCheckboxChange(task.id, !(task.attributes.status === 'Complete'))}
                                  _hover={{cursor: 'pointer'}}
                            >
                                {task.attributes.title}
                            </Text>
                            <Icon
                                ms='auto'
                                as={MdDelete}
                                color='secondaryGray.600'
                                w='24px'
                                h='24px'
                                cursor='pointer'
                                onClick={() => handleDelete(task.id)}
                            />
                        </Flex>
                    ))}
                </Box>
            </Card>
            <PieCard taskData={taskData}/>
        </SimpleGrid>
    );
}
