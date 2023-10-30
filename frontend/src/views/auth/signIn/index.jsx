/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {handleGoogleSignIn} from './auth.js';
import {useHistory} from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import {HSeparator} from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import {
    MdTask,
} from "react-icons/md";
import illustration from "assets/img/auth/auth.png";
import image_3d from "assets/img/3dplanme.png";
import Logo from "assets/img/PlanMeLogo.jpeg";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";

function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    // const textColorBrand = useColorModeValue("brand.500", "white");
    // const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue({bg: "gray.200"}, {bg: "whiteAlpha.300"});
    const googleActive = useColorModeValue({bg: "secondaryGray.300"}, {bg: "whiteAlpha.200"});

    const [show, setShow] = React.useState(false);
    // const handleClick = () => setShow(!show);
    const iconColor = useColorModeValue("green.500", "green.500");
    const history = useHistory();


    return (
        <DefaultAuth image={image_3d}>
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
                        onClick={() => handleGoogleSignIn(history)}
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