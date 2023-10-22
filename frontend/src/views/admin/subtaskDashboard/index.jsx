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

// Chakra imports
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";

import React from "react";

import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/subtaskDashboard/components/Tasks";

import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

export default function UserReports() {
    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Flex mb='20px' mt='20px'>
                <Text fontSize='xl' fontWeight='bold'>title</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>Description</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>summarized_text</Text>
            </Flex>
            <Flex mb='20px'>
                <Text fontSize='xl' fontWeight='bold'>Due Date</Text>
            </Flex>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <Tasks/>
                <PieCard/>
            </SimpleGrid>
            <FixedPlugin/>
        </Box>
    );
}
