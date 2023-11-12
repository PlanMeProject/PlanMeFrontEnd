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
            {/* ... Rest of your component */}
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
        </DefaultAuth>
    );
}

export default SignIn;
