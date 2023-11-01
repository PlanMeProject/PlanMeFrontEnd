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
                    console.log(subtasks[0]);
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
        const completedSubtasks = subtasks.filter(task => task.status === 'Completed').length;

        if (totalSubtasks > 0) {
            const completedPercentage = (completedSubtasks / totalSubtasks) * 100;
            const inProgressPercentage = 100 - completedPercentage;

            setTaskData([Math.round(completedPercentage), Math.round(inProgressPercentage)]);
        }
    }, [subtasks]);

    // Modal functions for opening and closing the modal
    const handleSubmit = () => {
        if (newSubtask.title === "") {
            // You can set an error state here to show an error message if you want
            return;
        }
        const newId = subtasks.length === 0 ? 1 : Math.max(...subtasks.map(task => task.id)) + 1;
        // Add the new subtask
        setSubtasks([...subtasks, {...newSubtask, id: newId}]);
        setIsOpen(false);
        setNewSubtask({title: '', status: 'Incomplete'});  // Reset the form
    };


    // Delete function
    const handleDelete = (subtaskId) => {
        const updatedSubtasks = subtasks.filter(task => task.id !== subtaskId);
        setSubtasks(updatedSubtasks);
    };

    // Handle checkbox state change
    const handleCheckboxChange = (subtaskId, newStatus) => {
        const updatedSubtasks = subtasks.map(task =>
            task.id === subtaskId ? {...task, status: newStatus} : task
        );
        setSubtasks(updatedSubtasks);
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
                        <Button mr='10px' onClick={loadData}>
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
                                    <option value="Incomplete">Incomplete
                                    </option>
                                    <option value="Completed">Completed
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

                {/* Conditionally render subtasks */}
                {
                    <Box px='11px'>
                        {subtasks.map((task, index) => (
                            <Flex key={index} mb='20px'>
                                <Checkbox me='16px' colorScheme='brandScheme'
                                          isChecked={task.status === 'Completed'}
                                          onChange={(e) => handleCheckboxChange(task.id, e.target.checked ? 'Completed' : 'Incomplete')}
                                />
                                <Text fontWeight='bold' color={textColor}
                                      fontSize='md'
                                      textAlign='start'>
                                    {task.title}
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
                }
            </Card>
            <PieCard taskData={taskData}/>
        </SimpleGrid>
    );
}
