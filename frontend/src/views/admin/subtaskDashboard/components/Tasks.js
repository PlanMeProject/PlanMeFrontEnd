// Chakra imports
import {
    Box,
    Flex,
    Text,
    Icon,
    useColorModeValue,
    Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

import {useState, useEffect} from "react";
// Assets
import {MdDelete, MdAssignment} from "react-icons/md";
import React from "react";

// subtask imports
import subtaskData from "./subtask.json";

export default function Conversion(props) {
    const {...rest} = props;
    const [subtasks, setSubtasks] = useState(subtaskData);

    // Delete function
    const handleDelete = (subtask_id) => {
        const updatedSubtasks = subtasks.filter(task => task.subtask_id !== subtask_id);
        setSubtasks(updatedSubtasks);
    };

    // Save to LocalStorage whenever subtasks change
    useEffect(() => {
        localStorage.setItem("subtasks", JSON.stringify(subtasks));
    }, [subtasks]);

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
                    Your Sub-tasks
                </Text>
                <Menu ms='auto'/>
            </Flex>
            <Box px='11px'>
                {subtasks.map((task, index) => (
                    <Flex key={index} mb='20px'>
                        <Checkbox me='16px' colorScheme='brandScheme'
                                  isChecked={task.status === 'Complete'}/>
                        <Text fontWeight='bold' color={textColor} fontSize='md'
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
                            onClick={() => handleDelete(task.subtask_id)}
                        />
                    </Flex>
                ))}
            </Box>
        </Card>
    );
}
