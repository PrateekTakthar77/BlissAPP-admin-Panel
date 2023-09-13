import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
  Spinner,
  Text,
  Box,
  Input,
  Select,
  Button,
  HStack,
  Stack,
  VStack,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AdminState } from "../../context/context";
import { useNavigate } from "react-router-dom";
import "./orderTable.css";

const OrdersTable = () => {
  const { token, API_BASE_URL } = AdminState();
  const toast = useToast();
  const navigateTo = useNavigate();

  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOrderStatusUpdate, setIsOrderStatusUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedSort, setSelectedSort] = useState("none");
  const [showStateButtonsForOrder, setShowStateButtonsForOrder] =
    useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false); // Manually manage tooltip open/close

  const handleSortingChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "none") {
      setSelectedFilter("none");
      setSelectedSort("none");
    } else if (selectedValue === "time") {
      setSelectedFilter("time");
    } else if (selectedValue === "price") {
      setSelectedFilter("price");
    } else if (selectedValue === "status") {
      setSelectedFilter("status");
    }
  };

  const handleStatusChange = async (newStatus, orderId) => {
    setSelectedOption(newStatus);
    try {
      console.log("hello");
      const response = await axios.put(
        `${API_BASE_URL}/api/carts/orders/${newStatus}`,
        {
          statusState: newStatus,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hello", response.data);
      setIsOrderStatusUpdate((prev) => !prev);
      toast({
        title: "Order Status Updated",
        description: "Order Status Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      // Manually close the tooltip after status change
      setTooltipOpen(false);
    } catch (error) {
      toast({
        title: "Order Status Update Failed",
        description: "Order Status Update Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedOrders = response.data.reverse();
        setAllOrders(sortedOrders);
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error);
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
  }, [isOrderStatusUpdate]);

  useEffect(() => {
    let filteredOrders = [...allOrders];
    if (selectedFilter === "none" && selectedSort === "none") {
      setOrders(allOrders);
      return;
    }
    if (selectedFilter === "time") {
      filteredOrders = filteredOrders.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (selectedFilter === "price") {
      filteredOrders = filteredOrders.sort((a, b) => a.total - b.total);
    } else if (selectedFilter === "status") {
      filteredOrders = filteredOrders.filter((a) => a.state === "pending");
    }

    if (selectedSort === "asc") {
      filteredOrders.reverse();
    }

    setOrders(filteredOrders);
  }, [selectedFilter, selectedSort]);

  const callSearchNow = (searchTerm) => {
    let filteredOrders = [...allOrders];
    filteredOrders = filteredOrders.filter((order) => {
      if (order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else if (
        order.user.mobile.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else if (
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else if (order.total.toString().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (
        order.items.some((item) => {
          if (
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (filteredOrders.length <= 0) {
      toast({
        title: "No Orders Found",
        description: "No Orders Found",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setError("No Orders Found");
      setOrders(allOrders);
      if (!error) {
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
      return;
    }
    setOrders(filteredOrders);
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm((prev) => value);
    if (setTimeOutID1) {
      clearTimeout(setTimeOutID1);
    }

    setTimeOutID1 = setTimeout(() => {
      callSearchNow(value);
    }, 370);
  };

  return (
    <>
      <Stack my={4} spacing={4} align="start">
        <HStack spacing={4}>
          <Input
            maxW={"20%"}
            value={searchTerm}
            placeholder="Search Order"
            onChange={(e) => {
              handleSearchTermChange(e.target.value);
            }}
          />
          <Select
            value={selectedOption}
            onChange={handleSortingChange}
            maxWidth={200}
          >
            <option value="none">Filter</option>
            <option value="none">None</option>
            <option value="time">Sort by Time</option>
            <option value="price">Sort by Price</option>
            <option value="status">Sort by Status</option>
          </Select>
          <Select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            maxWidth={120}
          >
            <option value="none">Sort</option>
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </HStack>
        <Table variant="striped">
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th>Time</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id} fontSize="small">
                <Td>{order.user?.name}</Td>
                <Td>{order.address ? order.address.addressLine : "-"}</Td>
                <Td>
                  <VStack align="start">
                    <Text fontSize={"smaller"}>
                      Order Time: {new Date(order.createdAt).toLocaleString()}
                    </Text>
                    <Text fontSize={"x-small"}>
                      Updated Time: {new Date(order.updatedAt).toLocaleString()}
                    </Text>
                  </VStack>
                </Td>
                <Td color="blue.500" fontWeight="bold">
                  {order.total + "₹"}
                </Td>
                <Td
                  color={
                    order.state === "pending" || order.state === "cancelled"
                      ? "red"
                      : order.state === "processing"
                      ? "blue"
                      : "green"
                  }
                >
                  {order.state}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip
                      label="Change Status"
                      isOpen={tooltipOpen}
                      onClose={() => setTooltipOpen(false)}
                      onOpen={() => setTooltipOpen(true)}
                    >
                      <IconButton
                        onClick={() => {
                          setShowStateButtonsForOrder(order._id);
                        }}
                        icon={<InfoOutlineIcon />}
                        colorScheme="blue"
                        size="sm"
                        variant="outline"
                      />
                    </Tooltip>
                    <Button
                      onClick={() => navigateTo(`/orders/${order._id}`)}
                      colorScheme="blue"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
      {showStateButtonsForOrder && (
        <HStack
          spacing={2}
          justifyContent="flex-end"
          mt={2}
          mb={4}
          marginRight={6}
        >
          {["accepted", "processing", "delivered", "cancelled", "pending"].map(
            (status) => (
              <Button
                key={status}
                onClick={() => {
                  handleStatusChange(status, showStateButtonsForOrder);
                }}
                colorScheme={
                  orders.find((order) => order._id === showStateButtonsForOrder)
                    ?.state === status
                    ? "green"
                    : status === "cancelled"
                    ? "red"
                    : "blue"
                }
                size="sm"
              >
                {status}
              </Button>
            )
          )}
        </HStack>
      )}
    </>
  );
};

export default OrdersTable;
