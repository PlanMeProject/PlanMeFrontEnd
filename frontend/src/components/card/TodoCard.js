import {
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Text,
    Box,
} from "@chakra-ui/react";

import Card from "components/card/Card.js";

import React from "react";

export default function Default(props) {
    const {startContent, endContent, name, growth, value, cardColor} = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";

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

                {/*{startContent}*/}

                {/*<Stat*/}
                {/*    bg='pink'*/}
                {/*    ms={startContent ? "18px" : "0px"}*/}
                {/*    w='85%'*/}
                {/*>*/}
                {/*    <StatNumber*/}
                {/*        color={textColor}*/}
                {/*        fontSize={{*/}
                {/*            base: "2xl",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {value}*/}
                {/*    </StatNumber>*/}
                {/* Small Card Inside Main Card */}

                {/*<Text*/}
                {/*    color={textColor}*/}
                {/*    fontSize={{*/}
                {/*        base: "2xl",*/}
                {/*    }}*/}
                {/*    fontWeight='bold'*/}
                {/*    mb='10px'*/}
                {/*>*/}
                {/*    {value}*/}
                {/*</Text>*/}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    // backgroundColor: 'white',
                    overflowY: 'auto'
                }}>
                    <Box
                        bg="white"
                        p={4}
                        borderRadius="20px"
                        boxShadow="md"
                        w="100%"
                        minH="100px"
                        mb="10px"
                    >
                        <Text
                            color='secondaryGray.900'
                        >This is a small card</Text>
                    </Box>
                    <Box
                        bg="white"
                        p={4}
                        borderRadius="20px"
                        boxShadow="md"
                        w="100%"
                        minH="100px"
                        mb="10px"
                    >
                        <Text
                            color='secondaryGray.900'
                        >This is a small card</Text>
                    </Box>
                    <Box
                        bg="white"
                        p={4}
                        borderRadius="20px"
                        boxShadow="md"
                        w="100%"
                        minH="100px"
                        mb="10px"
                    >
                        <Text
                            color='secondaryGray.900'
                        >This is a small card</Text>
                    </Box>
                    <Box
                        bg="white"
                        p={4}
                        borderRadius="20px"
                        boxShadow="md"
                        w="100%"
                        minH="100px"
                        mb="10px"
                    >
                        <Text
                            color='secondaryGray.900'
                        >This is a small card</Text>
                    </Box>
                    <Box
                        bg="white"
                        p={4}
                        borderRadius="20px"
                        boxShadow="md"
                        w="100%"
                        minH="100px"
                        mb="10px"
                    >
                        <Text
                            color='secondaryGray.900'
                        >This is a small card</Text>
                    </Box>
                </div>
                {/*</Stat>*/}

                {/*<Flex ms='auto' w='max-content'>*/}
                {/*    {endContent}*/}
                {/*</Flex>*/}

            </Flex>
        </Card>
    )
        ;

}
