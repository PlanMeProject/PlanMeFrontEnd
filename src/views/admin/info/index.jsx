// Chakra imports
import { Box, Grid, Text, VStack, Image } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";

// Assets
import banner from "assets/img/auth/banner.png";
import qrcode from "assets/img/qr.png";
import React from "react";

export default function InformationPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns="1fr"
        gap={{ base: "20px", xl: "20px" }}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Information Title
          </Text>
          <Text>
            Here is the place where you can add all the additional information
            you want to display on this page. Replace this text with your actual
            content.
          </Text>
          <Image src={qrcode} alt="QR Code" boxSize="100px" />
          <Text>
            Scan the QR code for more details.
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
}
