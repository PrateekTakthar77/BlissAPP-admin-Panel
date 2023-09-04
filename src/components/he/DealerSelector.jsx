import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Checkbox,
  VStack,
  Heading,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { AdminState } from "../context/context";

function DealerSelectors({ selectedDealers, setSelectedDealers }) {
  const [dealers, setDealers] = useState([]);

  const { API_LOCAL_URL, token } = AdminState();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${API_LOCAL_URL}/api/user-details/`); // Replace "API_URL" with your actual API endpoint
  //     setDealers(response.data);
  //     console.log("response.data:", response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch dealers:", error);
  //   }
  // };
  // console.log("fetchedddddd");
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_LOCAL_URL}/api/user-details/`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch dealers:", error);
      return null;
    }
  };

  // Use useMemo to memoize the fetchData function
  const memoizedFetchData = useMemo(() => fetchData, []);
  // Use memoizedFetchData instead of fetchData in fetchDealers
  const memoizedFetchDealers = useCallback(async () => {
    const dealersData = await memoizedFetchData();
    if (dealersData) {
      setDealers(dealersData);
      console.log("response.data:", dealersData);
    }
  }, [memoizedFetchData]);

  const fetchDealers = useCallback(async () => {
    const dealersData = await memoizedFetchDealers();
    if (dealersData) {
      setDealers(dealersData);
      console.log("response.data:", dealersData);
    }
  }, []);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  const handleCheckboxChange = (dealerId) => {
    if (selectedDealers.includes(dealerId)) {
      setSelectedDealers((prevSelectedDealers) =>
        prevSelectedDealers.filter((id) => id !== dealerId)
      );
    } else {
      setSelectedDealers((prevSelectedDealers) => [
        ...prevSelectedDealers,
        dealerId,
      ]);
    }
    console.log("selectedDealers:", selectedDealers);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Select dealers
      </Heading>
      {dealers.length > 0 && (
        <SimpleGrid columns={2} spacing={4}>
          {dealers
            .filter(({ user }) => user) // Filter out null or undefined users
            .map(({ user, brandName }, index) => (
              <Flex key={index} alignItems="center">
                <Checkbox
                  isChecked={selectedDealers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                  mr={2}
                />
                <HStack alignItems="flex-start">
                  <Box>{user.name}</Box>
                  <Box fontWeight="bold">{brandName}</Box>
                </HStack>
              </Flex>
            ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default DealerSelectors;
