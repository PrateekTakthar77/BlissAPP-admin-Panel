import React, { useState } from "react";
import {
  Box,
  Card,
  Heading,
  Text,
  Button,
  VStack,
  Collapse,
} from "@chakra-ui/react";

const AddressCard = ({ address }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Box>
        <Heading size="lg" mb={2}>
          Address
        </Heading>
        <Text fontSize="md" color="gray.700">
          <span style={{ fontWeight: "bold" }}> addresLine:</span>{" "}
          {address.addressLine}
          <br />
          <span style={{ fontWeight: "bold" }}> Pincode :</span>{" "}
          {address.pincode}
          <br />
          <span style={{ fontWeight: "bold" }}> City:</span> {address.city},{" "}
          {address.area}
          <br />
          <span style={{ fontWeight: "bold" }}>Country & State:</span>{" "}
          {address.country}, {address.state}
        </Text>
      </Box>
      <VStack mt={4}>
        <Button
          colorScheme="gray"
          size="sm"
          onClick={handleExpandToggle}
          variant="outline"
          _hover={{ bg: "gray.100" }}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </VStack>
      <Collapse in={isExpanded} animateOpacity>
        <Box mt={4}>
          <Heading size="md" mb={2}>
            More Details
          </Heading>
          <Text fontSize="md" color="gray.700">
            This is some more information about the address.
          </Text>
        </Box>
      </Collapse>
    </Card>
  );
};

export default AddressCard;
