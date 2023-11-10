import React from "react";
import {
    Flex,
    Text,
    Box,
    IconButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter, Button, useColorModeValue
} from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons';
import Card from "components/card/Card.js";
import {useHistory} from "react-router-dom";
import {useDisclosure} from "@chakra-ui/react";
import {useState, useRef} from "react";


export default function Default(props) {
    const {cardColor, onDragStart, onDragOver, onDrop, onDelete} = props;
    const {task} = props;
    const history = useHistory();

    // State for the AlertDialog
    const delButtonColor = useColorModeValue('secondaryGray', 'secondaryGray.900')
    const [toDeleteTaskId, setToDeleteTaskId] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef();

    const goToSubtask = (id) => {
        history.push(`/admin/task-board/task/${id}`);
    }

    return (
        <Card py='30px' bg={cardColor}>
            <Flex
                // my='auto'
                h='65vh'
                w='100%'
                direction='column'
                align='flex-start'
                alignContent={{base: "center", xl: "start"}}
                justify={{base: "start", xl: "start"}}
                paddingTop='0px'
            >
                <div
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto'
                    }}>
                    {task.map((task) => (
                        <Box
                            key={task.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, task)}
                            bg="white"
                            p={4}
                            borderRadius="20px"
                            boxShadow="md"
                            w="100%"
                            minH="100px"
                            mb="10px"
                            _hover={{cursor: 'grab'}}
                            onClick={() => goToSubtask(task.id)}
                        >
                            <Flex display='inline-flex'>
                                <Text
                                    color='secondaryGray.900'
                                >{task.attributes.title}</Text>
                                <Text
                                    color='secondaryGray.800'
                                    mr='auto'
                                >del</Text>
                            </Flex>
                            <Text
                                color='red.400'
                            >{task.attributes.due_date}</Text>
                        </Box>
                    ))}
                </div>
            </Flex>
        </Card>
    );
}