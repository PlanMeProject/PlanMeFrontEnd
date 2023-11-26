/* eslint-disable */
import React, {useContext, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";
// chakra imports
import {Box, Flex, HStack, Text, useColorModeValue} from "@chakra-ui/react";
import {SidebarContext} from "../../../contexts/SidebarContext";

export function SidebarLinks(props) {
    //   Chakra color mode
    let location = useLocation();
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue(
        "secondaryGray.600",
        "secondaryGray.600"
    );
    let activeIcon = useColorModeValue("brand.500", "white");
    let textColor = useColorModeValue("secondaryGray.500", "white");
    let brandColor = useColorModeValue("brand.500", "brand.400");

    const userToken = localStorage.getItem('userToken') || '';
    const userId = localStorage.getItem('userId') || '';

    const {routes} = props;
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    };

    const generateLinkUrl = (route) => {
        if (route.name === "Task board") {
            return `/admin/task-board/${userToken}/${userId}`;
        } else if (route.name === "Calendar") {
            return `/admin/calendar/${userId}`;
        }
        return route.layout + route.path;
    };

    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (route.category) {
                return (
                    <>
                        <Text
                            fontSize={"md"}
                            color={activeColor}
                            fontWeight='bold'
                            mx='auto'
                            ps={{
                                sm: "10px",
                                xl: "16px",
                            }}
                            pt='18px'
                            pb='12px'
                            key={index}>
                            {route.name}
                        </Text>
                        {createLinks(route.items)}
                    </>
                );
            } else if (
                route.visible === "yes"
            ) {

                return (
                    <NavLink key={index} to={generateLinkUrl(route)}>
                        {route.icon ? (
                            <Box>
                                <HStack
                                    spacing={
                                        activeRoute(generateLinkUrl(route)) ? "22px" : "26px"
                                    }
                                    py='5px'
                                    ps='10px'>
                                    <Flex w='100%' alignItems='center'
                                          justifyContent='center'>
                                        <Box
                                            color={
                                                activeRoute(generateLinkUrl(route))
                                                    ? activeIcon
                                                    : textColor
                                            }
                                            me='18px'>
                                            {route.icon}
                                        </Box>
                                        <Text
                                            me='auto'
                                            color={
                                                activeRoute(generateLinkUrl(route))
                                                    ? activeColor
                                                    : textColor
                                            }
                                            fontWeight={
                                                activeRoute(generateLinkUrl(route))
                                                    ? "bold"
                                                    : "normal"
                                            }>
                                            {route.name}
                                        </Text>
                                    </Flex>
                                    <Box
                                        h='36px'
                                        w='4px'
                                        bg={
                                            activeRoute(generateLinkUrl(route))
                                                ? brandColor
                                                : "transparent"
                                        }
                                        borderRadius='5px'
                                    />
                                </HStack>
                            </Box>
                        ) : (
                            <Box>
                                <HStack
                                    spacing={
                                        activeRoute(generateLinkUrl(route)) ? "22px" : "26px"
                                    }
                                    py='5px'
                                    ps='10px'>
                                    <Text
                                        me='auto'
                                        color={
                                            activeRoute(generateLinkUrl(route))
                                                ? activeColor
                                                : inactiveColor
                                        }
                                        fontWeight={
                                            activeRoute(generateLinkUrl(route)) ? "bold" : "normal"
                                        }>
                                        {route.name}
                                    </Text>
                                    <Box h='36px' w='4px' bg='brand.400'
                                         borderRadius='5px'/>
                                </HStack>
                            </Box>
                        )}
                    </NavLink>
                );
            }
        });
    };
    return createLinks(routes);
}

export default SidebarLinks;
