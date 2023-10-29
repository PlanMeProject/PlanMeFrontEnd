// Chakra imports
import {
    Box,
    Flex,
    Text,
    Icon,
    useColorModeValue,
    Checkbox, FormHelperText, Select,
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
import IconBox from "components/icons/IconBox";

import {useState} from "react";
// Assets
import {MdDelete, MdAssignment, MdAdd} from "react-icons/md";
import React from "react";

// subtask imports
import mockData from "../../datas/mock.json";
import {useParams} from "react-router-dom";

export default function Conversion(props) {

    const userID = 1; // Replace with user ID
    const userData = mockData["users"].find(user => user.id === userID);
    const { id } = useParams(); // Replace with task ID
    const task = userData["tasks"].find(task => task.id === parseInt(id));

    const {...rest} = props;

    const [subtasks, setSubtasks] = useState([]);
    // const [showSubtasks, setShowSubtasks] = useState(false);
    // const [isDataLoaded, setDataLoaded] = useState(false); // State variable to track if data is loaded

    const [isOpen, setIsOpen] = useState(false);
    const [newSubtask, setNewSubtask] = useState({
        title: '',
        status: 'Incomplete'
    });

    const loadData = () => {
        // Simulate data retrieval here. Replace with actual data fetching logic
        const subtaskData = task["subtasks"];
        setSubtasks(subtaskData);
        // setDataLoaded(true);  // Set the data as loaded
    };

    // Modal functions for opening and closing the modal
    const handleSubmit = () => {
        if (newSubtask.title === "") {
            // You can set an error state here to show an error message if you want
            return;
        }
        const newId = subtasks.length===0 ? 1: Math.max(...subtasks.map(task => task.id))+1;
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
        <Card p='20px' align='center' direction='column' w='100%' {...rest}>
            <Flex alignItems='center' w='100%' mb='30px'>
                <IconBox
                    me='12px'
                    w='38px'
                    h='38px'
                    bg={boxBg}
                    icon={<Icon as={MdAssignment} color={brandColor} w='24px'
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
                                <option value="Incomplete">Incomplete</option>
                                <option value="Completed">Completed</option>
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
    );
}
