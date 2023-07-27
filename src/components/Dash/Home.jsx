import React, { useEffect, useState } from "react";
import { Box, Flex, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { SpinnerIcon } from "@chakra-ui/icons";
import { AdminState } from "../context/context";
import BasicStatistics from "./DashCards";
const DashboardCard = ({ title, value }) => {
  return (
    <Box p={4} borderRadius="md" boxShadow="lg" bg="white" textAlign="center">
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        {title}
      </Text>
      <Text fontSize="4xl">{value}</Text>
    </Box>
  );
};

const HomeDashboard = () => {
  // Replace these sample data with your actual data
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [error, setError] = useState(null);
  const { user, token, API_BASE_URL, loadingState, setLoadingState } =
    AdminState();
  console.log("API_BASE_URLHome:", API_BASE_URL);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("-->", response.data);

        let tr = response.data.reduce((acc, curr) => {
          return acc + Number(curr.total);
        }, 0);
        setTotalRevenue(tr);
        console.log("tr:", tr);
        setTotalOrders(response.data.length);
        setError(null);
      } catch (error) {
        console.error("error-> ", error);
        setError(
          (prev) =>
            error.response.data.message ||
            error.response.data.error ||
            error.message ||
            "Error while fetching orders"
        );
      }
    };

    fetchOrders();
  }, [loadingState]);

  useEffect(() => {
    // console.log("processssss", import.meta.env.VITE_APP_BASE_URL);
    const fetchNewUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalUsers(response.data.length);
        setError(null);
      } catch (error) {
        console.error("error-> ", error);
        setError(
          (prev) =>
            error.response.data.message ||
            error.response.data.error ||
            error.message ||
            "Error while fetching users"
        );
      }
    };

    fetchNewUsers();
  }, [loadingState]);

  const getTotalProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const totalProducts = response.data.length;
      console.log(totalProducts);
      setError(null);
      return totalProducts;
    } catch (error) {
      console.error("error-> ", error);
      setError(
        (prev) =>
          error.response.data.message ||
          error.response.data.error ||
          error.message ||
          "Error while fetching products"
      );
    }
  };
  useEffect(() => {
    const ex = async () => {
      const tp = await getTotalProducts();
      setTotalProducts((prev) => tp);
      console.log("totalProducts:", tp);
    };
    ex();
  }, [loadingState]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState((prev) => true);
    }, 2000);
  }, [token]);

  console.log("loadingState2", loadingState);
  return (
    <>
      {!loadingState ? (
        <Box> Loading... {console.log("loadingState", loadingState)} </Box>
      ) : error ? (
        <>
          <Box>{error}</Box>
        </>
      ) : (
        <>
          {totalUsers && totalOrders ? (
            <BasicStatistics
              totalOrders={totalOrders}
              totalUsers={totalUsers}
              totalProducts={totalProducts}
              totalRevenue={totalRevenue}
            />
          ) : (
            <>
              <Box display="flex" justifyContent="center" mt={48}>
                <Spinner boxSize={12} alignSelf={"center"} />
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeDashboard;
