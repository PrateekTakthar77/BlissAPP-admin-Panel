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
} from "@chakra-ui/react";
import axios from "axios";
import EditMakingChargesForm from "./EditMakingChargesForm";
const MakingChargesTable = () => {
  const [makingCharges, setMakingCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await axios.get(
        "http://localhost:5009/api/makingcharges"
      );
      setMakingCharges(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error while fetching making charges");
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <Box maxW={"100%"} minW={"100%"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Subcategory</Th>
                <Th>Making Charges</Th>
              </Tr>
            </Thead>
            {/* <Tbody>
              {makingCharges.map((charge) => (
                <Tr key={charge._id}>
                  <Td>{charge.category}</Td>
                  <Td>{charge.subcategory}</Td>
                  <Td>{charge.makingcharges} %</Td>
                </Tr>
              ))}
            </Tbody> */}
            <Tbody>
              {makingCharges.map((charge) => (
                <Tr key={charge._id}>
                  <Td>{charge.category}</Td>
                  <Td>{charge.subcategory}</Td>
                  <Td>{charge.makingcharges} %</Td>
                  <Td>
                    <Button
                      onClick={() => handleEditMakingCharges(charge)}
                      ml={2}
                      size="sm"
                      colorScheme="blue"
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {isEditing && (
              <EditMakingChargesForm
                makingChargesData={editMakingChargesData}
                onClose={() => setIsEditing(false)}
                refreshTable={refreshTable}
              />
            )}
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default MakingChargesTable;
