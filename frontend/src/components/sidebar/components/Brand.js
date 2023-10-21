import React from "react";

// Chakra imports
import {Flex, useColorModeValue} from "@chakra-ui/react";

// Custom components
import PlanMeLogo from "assets/img/PlanMeLogo.jpeg";
import {HSeparator} from "components/separator/Separator";
import {Text} from "@chakra-ui/react";

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex align='center' direction='column'>
            {/*<img src={PlanMeLogo} alt="PlanMe Logo" width="175px" height="26px" my='32px'/>*/}
            <Text fontSize='2xl' fontWeight='bold' color={logoColor}>PlanMe</Text>
            {/*<PlanMeLogo h='26px' w='175px' my='32px' color={logoColor}/>*/}
            <HSeparator mb='20px'/>
        </Flex>
    );
}

export default SidebarBrand;
