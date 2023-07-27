import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminState } from "../../context/context";
import AddressCard from "./AddressCard";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();
  const [error, setError] = useState(null); //
  const { API_BASE_URL } = AdminState();
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchOrderData = async () => {
      console.log("fetching order data");
      console.log("orderId:", orderId);
      try {
        const response = await axios(
          `${API_BASE_URL}/api/admin/orders/${orderId}`
        );

        if (typeof response.data === "string") {
          setError((prev) => response.data);
          setOrderData([]);
          return;
        }
        setOrderData((prev) => response.data);
        console.log("orderData:", response.data);
      } catch (error) {
        console.log("Error fetching order data:", error);
        setError(response.data.error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (!orderData) {
    return <Text>Loading...</Text>;
  }

  console.log("orderData:", orderData);
  const { status, user, items, state, total, timeCreated } = orderData;

  const getColor = () => {
    if (state === "pending" || state === "cancelled") {
      return "red";
    } else if (state === "processing") {
      return "blue";
    } else {
      return "green";
    }
  };

  const handleBack = () => {
    navigateTo("/orders");
  };

  return (
    <>
      {error ? (
        <Box>{error}</Box>
      ) : (
        <VStack spacing={4} alignItems="left" mt={4}>
          <Text fontWeight="bold">
            orderId:{" "}
            {orderData.orderId != " For OrderId refers to this order _ID"
              ? orderData.orderId
              : orderData._id}
          </Text>
          <Button onClick={handleBack}>Go Back</Button>
          <Card>
            <CardBody>
              <Text style={{ color: getColor() }} fontWeight="bold">
                Status: {status}
              </Text>
              <Text fontWeight="bold">User: {user?.name}</Text>
              <Text fontWeight="bold">Email: {user?.email}</Text>
              <Text fontWeight="bold">Mobile: {user?.mobile}</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text fontWeight="bold">Items:</Text>
              <Grid
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={4}
              >
                {items.map((item) => (
                  <GridItem key={item._id}>
                    <Card>
                      <CardBody>
                        <Text fontWeight="bold">
                          Name: {item.product?.name}
                        </Text>
                        <Text>Price: {item.product?.price}</Text>
                        <Text>Quantity: {item.quantity || "0"}</Text>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </CardBody>
          </Card>
          {orderData.address && <AddressCard address={orderData.address} />}
          <Card>
            <CardBody>
              <Text fontWeight="bold">
                Status: <span style={{ color: getColor() }}>{state}</span>
              </Text>
              <Text fontWeight="bold">Total: {total}</Text>
              <Text fontWeight="bold">
                Time Created: {new Date(timeCreated).toLocaleString()}
              </Text>
            </CardBody>
          </Card>
        </VStack>
      )}
    </>
  );
};

export default OrderDetails;
