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
import EditPremiumForm from "./editpremium";
import { EditIcon } from "@chakra-ui/icons"; // Import EditIcon from Chakra UI

const MakingChargesTable = () => {
  const [makingCharges, setMakingCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { API_BASE_URL } = AdminState();

  useEffect(() => {
    fetchMakingCharges();
  }, []);

  const [editMakingChargesData, setEditMakingChargesData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditMakingCharges = (makingChargesData) => {
    setEditMakingChargesData(makingChargesData);
    setIsEditing(true);
  };

  const refreshTable = () => {
    fetchMakingCharges();
    setIsEditing(false);
  };

  const fetchMakingCharges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/premium/`);
      setMakingCharges(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error while fetching making charges. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Box>
      <Center>
        <Heading as="h1" size="l" mb="4" mt="2">
          PREMIUM CHARGES ON PRODUCTS
        </Heading>
      </Center>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : error ? (
        <Box color="red.500">{error}</Box>
      ) : (
        <Box maxW={"100%"} minW={"100%"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Premium Charges</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {makingCharges.map((charge) => (
                <Tr key={charge._id}>
                  <Td>{charge.premiumcharges}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEditMakingCharges(charge)}
                      ml={2}
                      size="sm"
                      colorScheme="blue"
                      leftIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {isEditing && (
        <EditPremiumForm
          makingChargesData={editMakingChargesData}
          onClose={() => setIsEditing(false)}
          refreshTable={refreshTable}
        />
      )}
    </Box>
  );
};

export default MakingChargesTable;
