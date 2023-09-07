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
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { format } from "date-fns"; // Import the format function
// import EditMakingChargesForm from "./EditMakingChargesForm";
const bookingsTable = () => {
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

  return (
    <Box>
      {/* Add a heading here */}
      <Center>
        <Heading as="h1" size="l" mb="4" mt="2">
          APPOINTMENT BOOKING LIST
        </Heading>
      </Center>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <Box maxW={"100%"} minW={"100%"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {makingCharges.map((data) => (
                <Tr key={data._id}>
                  <Td>{data.name}</Td>
                  <Td>{data.phone}</Td>
                  <Td>{format(new Date(data.date), "dd-MM-yyyy")}</Td>
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
