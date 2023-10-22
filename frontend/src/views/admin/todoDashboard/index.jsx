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
import React from "react";
import {
    MdAdd,
    MdAddTask,
} from "react-icons/md";


export default function UserReports() {
    const textColor = useColorModeValue("navy.700", "gray.200");
    const todoCardColor = useColorModeValue("#FFE999", "#FFDE6A");
    const inProgressCardColor = useColorModeValue("#CDC5FF", "#8F7CFF");
    const doneCardColor = useColorModeValue("#9EEECC", "#51EFAD");
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
                              color='navy.700'>5</Text>

                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>Todo</Text>
                    </div>
                    <Flex>
                        <Icon mt='4px' ml='5px' w='28px' h='28px' as={MdAdd}
                              color={textColor}/>
                    </Flex>
                </Flex>
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
                              color='navy.700'>6</Text>

                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>In progress</Text>
                    </div>
                    <Flex>
                        <Icon mt='4px' ml='5px' w='28px' h='28px' as={MdAdd}
                              color={textColor}/>
                    </Flex>
                </Flex>
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
                              color='navy.700'>7</Text>

                        <Text fontSize='2xl' fontWeight='bold' ml='10px'
                              color={textColor}>Complete</Text>
                    </div>
                    <Flex>
                        <Icon mt='4px' ml='5px' w='28px' h='28px' as={MdAdd}
                              color={textColor}/>
                    </Flex>
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
                />
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
