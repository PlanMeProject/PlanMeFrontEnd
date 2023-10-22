import {
    Flex,
    Text,
    Box,
} from "@chakra-ui/react";

import Card from "components/card/Card.js";
import { useHistory } from "react-router-dom";
import React from "react";

import mockData from "../../datas/mock.json";

export default function Default(props) {
    const {cardColor} = props;
    const history = useHistory();

    const userID = 1; // Replace with user ID
    const userData = mockData["users"].find(user => user.id === userID);
    const task = userData["tasks"];

    const goToSubtask = (id) => {
        history.push(`/admin/task-board/task/${id}`);
    }

    return (
        <Card py='30px' bg={cardColor}>
            <Flex
                // my='auto'
                h='65vh'
                w='100%'
                direction='column'
                align='flex-start'
                alignContent={{base: "center", xl: "start"}}
                justify={{base: "start", xl: "start"}}
                paddingTop='0px'
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    // backgroundColor: 'white',
                    overflowY: 'auto'
                }}>
                    {task.map((task) => (
                        <Box
                            bg="white"
                            p={4}
                            borderRadius="20px"
                            boxShadow="md"
                            w="100%"
                            minH="100px"
                            mb="10px"
                            onClick={() => goToSubtask(task.id)}
                        >
                            <Text
                                color='secondaryGray.900'
                            >{task.title}</Text>
                        </Box>
                    ))}
                    {/*<Box*/}
                    {/*    bg="white"*/}
                    {/*    p={4}*/}
                    {/*    borderRadius="20px"*/}
                    {/*    boxShadow="md"*/}
                    {/*    w="100%"*/}
                    {/*    minH="100px"*/}
                    {/*    mb="10px"*/}
                    {/*    onClick={() => goToSubtask(5)}*/}
                    {/*>*/}
                    {/*    <Text*/}
                    {/*        color='secondaryGray.900'*/}
                    {/*    >This is a small card</Text>*/}
                    {/*</Box>*/}
                </div>
            </Flex>
        </Card>
    );
}
