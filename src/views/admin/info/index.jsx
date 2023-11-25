// Chakra imports
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
            Information Title
          </Text>
          <Text>
            PlanMe is designed for students who have at least one Google Classroom they are a student in. In case you don't, we've prepared a testing Classroom for you to experience the `Get Google Classroom Assignments` feature. Here is the link and the QR code, feel free to pick one.
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
        </VStack>
      </Grid>
    </Box>
  );
}
