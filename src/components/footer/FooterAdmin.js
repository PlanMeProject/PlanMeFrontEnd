/*eslint-disable*/
import React from "react";
import {
    Flex,
    Link,
    List,
    ListItem,
    Text,
    Button,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
    const textColor = useColorModeValue("gray.400", "white");

    return (
        <Flex
            zIndex='3'
            flexDirection={{
                base: "column",
                xl: "row",
            }}
            alignItems={{
                base: "center",
                xl: "start",
            }}
            justifyContent='space-between'
            px={{base: "30px", md: "50px"}}
            pb='30px'>
            <Text
                color={textColor}
                textAlign={{
                    base: "center",
                    xl: "start",
                }}
                mb={{base: "20px", xl: "0px"}}>
                {" "}
                <Text as='span' fontWeight='500' ms='4px'>
                    PlanMe, All rights reserved. Made by
                    <Link
                        mx='3px'
                        color={textColor}
                        href='https://github.com/PlanMeProject'
                        target='_blank'
                        fontWeight='700'>
                        Planme Team.
                    </Link>
                </Text>
            </Text>
        </Flex>
    );
}
