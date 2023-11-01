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

    useEffect(() => {
        // Your API endpoint
        fetch("http://127.0.0.1:8000/api/users/f6084d8f-3a96-4288-b18f-fc174ce13b01/tasks/")
            .then((response) => response.json())
            .then((data) => {
                const taskData = data["data"];
                if (taskData) {
                    setTask(taskData);
                    console.log(taskData[1].attributes.status);
                    setNumTodo(taskData.filter(task => task.attributes.status === 'Todo').length);
                    setNumInProgress(taskData.filter(task => task.attributes.status === 'In Progress').length);
                    setNumCompleted(taskData.filter(task => task.attributes.status === 'Completed').length);
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
                              padding='0px 11px 0px 11px'
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numTodo}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px' color={textColor}>
                            Todo
                        </Text>
                    </div>
                </Flex>
                <Flex alignContent='center' justifyContent='space-between' padding='0 15px 0 15px'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Text fontSize='2xl' fontWeight='bold'
                              backgroundColor='white'
                              padding='0px 11px 0px 11px'
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numInProgress}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px' color={textColor}>
                            In progress
                        </Text>
                    </div>
                </Flex>
                <Flex alignContent='center' justifyContent='space-between' padding='0 15px 0 15px'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Text fontSize='2xl' fontWeight='bold'
                              backgroundColor='white'
                              padding='0px 11px 0px 11px'
                              borderRadius='50px'
                              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                              color='navy.700'>
                            {numCompleted}
                        </Text>
                        <Text fontSize='2xl' fontWeight='bold' ml='10px' color={textColor}>
                            Complete
                        </Text>
                    </div>
                </Flex>
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}}
                        gap='20px'
                        mb='20px'>
                <TodoCard
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
                <TodoCard
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
                    task={task.filter(task => task.attributes.status === 'In Progress')}
                />
                <TodoCard
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
                    task={task.filter(task => task.attributes.status === 'Completed')}
                />
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
