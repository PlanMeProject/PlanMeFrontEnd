import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { handleGoogleSignIn } from './auth.js';
import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdTask } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import DefaultAuth from "layouts/auth/Default";

function SignIn() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue({ bg: "gray.200" }, { bg: "whiteAlpha.300" });
    const googleActive = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.200" });
    const iconColor = useColorModeValue("green.500", "green.500");

    return (
        <DefaultAuth image={"image_3d_placeholder"}>
            <Flex
                // bg='red.500'
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

                    <Flex display='inline-flex'>
                        <Icon mt='4px' ml='5px' mr='5px' w='37px' h='37px'
                              as={MdTask}
                              color={iconColor}/>
                        <Heading color={textColor} fontSize='36px' mb='10px'>
                            PlanMe
                        </Heading>
                    </Flex>

                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Please sign in with your google account!
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
