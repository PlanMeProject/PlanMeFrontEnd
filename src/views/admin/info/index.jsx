import { Box, Grid, Text, VStack, Image, Link } from "@chakra-ui/react";

import qrcode from "assets/img/qr.png";
import React from "react";

export default function InformationPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns="1fr"
        gap={{ base: "20px", xl: "20px" }}>
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
    </Box>
  );
}
