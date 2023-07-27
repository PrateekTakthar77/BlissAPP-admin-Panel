import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useToast,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";

function DealerMap() {
  const { API_LOCAL_URL } = AdminState();
  const { personId } = useParams();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get(
          `${API_LOCAL_URL}/api/admin/salesperson/${personId}`
        );
        setDealers(response.data?.salesperson?.dealers || []);
        setLoading(false);
        console.log("dealers:", response.data, API_LOCAL_URL);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch dealer data");
      }
    };

    fetchDealers();
  }, [API_LOCAL_URL, personId]);

  const handleBack = () => {
    navigateTo("/salesperson");
  };

  return (
    <>
      {!loading ? (
        <Box mx="auto" p={8} bg="white" borderRadius="md">
          {dealers.length > 0 ? (
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Brand</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dealers.map((dealer, index) => (
                  <Tr key={index}>
                    <Td>{dealer.name}</Td>
                    <Td>{dealer.userDetails.brandName}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <p>No dealers found.</p>
          )}
        </Box>
      ) : (
        <Box
          mx="auto"
          maxW="100%"
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      )}
    </>
  );
}

export default DealerMap;
