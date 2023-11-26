import React from 'react';
import {
    Box,
    Grid,
    Text,
    VStack,
    Image,
    Link,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    UnorderedList,
    ListItem,
    Heading,
    Icon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md'; // Example icon

import qrcode from 'assets/img/qr.png';

export default function InformationPage() {
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Mini Guide</Tab>
                    <Tab>For Non-Students</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Heading as="h3" size="lg" mb={4}>
                            Mini How To
                        </Heading>
                        <UnorderedList spacing={3}>
                            <ListItem>
                                <Heading as="h4" size="md" color="blue.500" mb={2}>
                                    <Icon as={MdCheckCircle} mr={2} /> Select Courses
                                </Heading>
                                Pick the courses you want to manage. You'll need to re-select them whenever you log in so we can check for new assignments.
                            </ListItem>
                            <ListItem>
                                <Heading as="h4" size="md" color="green.500" mb={2}>
                                    <Icon as={MdCheckCircle} mr={2} /> Delete Tasks
                                </Heading>
                                Deleted tasks won't reappear, even if you re-select the course. You can also try delete tasks in PlanMe Google Classroom (check the next tab).
                            </ListItem>
                            <ListItem>
                                <Heading as="h4" size="md" color="orange.500" mb={2}>
                                    <Icon as={MdCheckCircle} mr={2} /> Non-Students
                                </Heading>
                                You can't get the task from the courses that you aren't a student (check the next tab).
                            </ListItem>
                            <ListItem>
                                <Heading as="h4" size="md" color="red.500" mb={2}>
                                    <Icon as={MdCheckCircle} mr={2} /> Re-authenticate
                                </Heading>
                                You can stay logged in for up to 1 hour before needing to re-authenticate. This regenerates your Google Classroom token.
                            </ListItem>
                            <ListItem>
                                <Heading as="h4" size="md" color="purple.500" mb={2}>
                                    <Icon as={MdCheckCircle} mr={2} /> Drag and Drop
                                </Heading>
                                You can drag and drop tasks between the task board and calendar.
                            </ListItem>
                        </UnorderedList>
                    </TabPanel>
                    <TabPanel>
                        {/* Content for Non-Students */}
                        <Grid templateColumns="1fr" gap={{ base: '20px', xl: '20px' }}>
                            <VStack spacing={4}>
                                <Text fontSize="xxl" fontWeight="bold">
                                    For Non-Students
                                </Text>
                                <Text>
                                    PlanMe is designed for students who have at least one Google Classroom they were a student. In case that you don't, we've prepared a testing Classroom for you to experience the `Get Google Classroom Assignments` feature. Here is the link and the QR code, feel free to pick one.
                                </Text>
                                <Text color="red.500" fontWeight="bold">
                                    (Make sure to use the same mail that you logged in to the application)
                                </Text>
                                <Link href="https://classroom.google.com/c/NTMwNzYwOTUxODMy?cjc=xyrson2" isExternal color="blue.500">
                                    https://classroom.google.com/c/NTMwNzYwOTUxODMy?cjc=xyrson2
                                </Link>
                                <Image
                                    src={qrcode}
                                    alt="QR Code"
                                    boxSize="100px"
                                    height="150px"
                                    objectFit="cover"
                                />
                                <Text>
                                    Scan the QR code for more details.
                                </Text>
                                <Text>
                                    After you join the classroom, you can go back to the Task Board page and select the 'PlanMe' course. Feel free to leave it whenever you want.
                                </Text>
                            </VStack>
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
