import React from "react";
import {handleGoogleSignIn} from './auth';
import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {MdTask} from "react-icons/md";
import {FcGoogle} from "react-icons/fc";
import DefaultAuth from "layouts/auth/Default";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

function SignIn() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = useColorModeValue("navy.700", "whiteAlpha.900");
    const signInTextColor = useColorModeValue("blue.500", "orange.500");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue({bg: "gray.200"}, {bg: "whiteAlpha.300"});
    const googleActive = useColorModeValue({bg: "secondaryGray.300"}, {bg: "whiteAlpha.200"});
    const iconColor = useColorModeValue("green.500", "green.500");
    const storedToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    const history = useHistory();

    useEffect(() => {
        console.log(storedToken);
        console.log(storedUserId);
        if (storedToken && storedUserId) {
            history.push(`/admin/task-board/${storedUserId}/${storedToken}`);
        }
    }, [storedToken, storedUserId, history]);

    return (
        <DefaultAuth image={"frontend/src/assets/img/3dplanme.png"}>
            <Flex
                maxW={{base: "100%", md: "max-content"}}
                w='100%'
                mx={{base: "auto", lg: "0px"}}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{base: "30px", md: "60px"}}
                px={{base: "25px", md: "0px"}}
                mt={{base: "40px", md: "14vh"}}
                flexDirection='column'>
                <Box me='auto'>

                    <Flex display='inline-flex' mt={{base: "100px", md: "60px"}}>
                        <Icon mt='4px' ml='5px' mr='5px' w='40px' h='40px'
                              as={MdTask}
                              color={iconColor}/>
                        <Heading color={textColor} fontSize='40px' mb='10px'>
                            PlanMe
                        </Heading>
                    </Flex>

                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>

                    </Text>
                    <Text
                        mb='36px'
                        ms='20px'
                        color={textColorSecondary}
                        fontWeight='600'
                        fontSize='md'>
                        A task management web-application for you!<br/>
                        <Text
                            mb='36px'
                            ms='40px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md'>
                            <br/>
                            <ul>
                                <li>Plan your tasks</li>
                                <li>Track your progress</li>
                                <li>Get things done!</li>
                            </ul>
                        </Text>
                        <Text
                            mb='36px'
                            ms='4px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md'
                            textColor={signInTextColor}
                        >
                            Please sign in with your google classroom account!<br/>

                        </Text>
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{base: "100%", md: "420px"}}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{base: "auto", lg: "unset"}}
                    me='auto'
                    mb={{base: "20px", md: "auto"}}>
                    <Button
                        onClick={handleGoogleSignIn}
                        fontSize='sm'
                        me='0px'
                        mb='26px'
                        py='15px'
                        h='50px'
                        borderRadius='16px'
                        bg={googleBg}
                        color={googleText}
                        fontWeight='500'
                        _hover={googleHover}
                        _active={googleActive}
                        _focus={googleActive}
                    >
                        <Icon as={FcGoogle} w='20px' h='20px' me='10px'/>
                        Sign in with Google
                    </Button>
                </Flex>
            </Flex>

        </DefaultAuth>
    );
}

export default SignIn;
