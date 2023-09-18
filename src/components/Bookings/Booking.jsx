import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Button,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { format } from "date-fns"; // Import the format function
// import EditMakingChargesForm from "./EditMakingChargesForm";
const bookingsTable = () => {
  const toast = useToast();
  const [makingCharges, setMakingCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { API_BASE_URL } = AdminState();

  useEffect(() => {
    fetchMakingCharges();
  }, []);
  //
  const [editMakingChargesData, setEditMakingChargesData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditMakingCharges = (makingChargesData) => {
    setEditMakingChargesData(makingChargesData);
    setIsEditing(true);
  };

  const refreshTable = () => {
    // Add logic to refresh the making charges table (e.g., by re-fetching data)
    fetchMakingCharges();
    setIsEditing(false);
  };

  const fetchMakingCharges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/`);
      setMakingCharges(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error while fetching making charges");
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      // Send a DELETE request to your API endpoint
      await axios.delete(`${API_BASE_URL}/api/bookings/delete`, {
        data: { bookingId }, // Send the bookingId in the request body
      });
      // Show a success toast
      toast({
        title: "Booking Deleted",
        status: "error",
        duration: 3000, // Duration in milliseconds
        isClosable: true, // Allow the user to close the toast
        position: "top",
      });

      // Remove the deleted booking from the state
      setMakingCharges((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      setError("Error while deleting the booking");
    }
  };
  return (
    <Box>
      <Center>
        <Heading as="h1" size="l" mb="4" mt="2">
          APPOINTMENT BOOKING LIST
        </Heading>
      </Center>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      ) : (
        <Box maxW={"100%"} minW={"100%"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {makingCharges.map((data) => (
                <Tr key={data._id}>
                  <Td>{data.name}</Td>
                  <Td>{data.phone}</Td>
                  <Td>{format(new Date(data.date), "dd-MM-yyyy")}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteBooking(data._id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default bookingsTable;
