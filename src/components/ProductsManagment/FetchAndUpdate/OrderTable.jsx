import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
  Select,
  useToast,
  Spinner,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../../context/context";
import { useNavigate } from "react-router-dom";
let setTimeOutID1;
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

  const handleOptionChange = async (event, orderId) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(token);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/carts/orders/${selectedValue}`,
        {
          statusState: selectedValue,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsOrderStatusUpdate((prev) => !prev);
      toast({
        title: "Order Status Updated",
        description: "Order Status Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
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
        console.log("-->", response.data);
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
    console.log("searchTerm-->:", searchTerm);
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
            console.log(
              "item:",
              item.product.name.toLowerCase(),
              searchTerm,
              "true"
            );
            return true;
          }
        })
      ) {
        return true;
      } else {
        return false;
      }
      console.log("order:", order.user.name.toLowerCase(), searchTerm);
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
      console.log("clearing timeout", setTimeOutID1);
      clearTimeout(setTimeOutID1);
    }

    setTimeOutID1 = setTimeout(() => {
      callSearchNow(value);
    }, 370);
  };

  const renderTableBody = () => {
    if (error) {
      return <Box>{error}</Box>;
    } else if (orders.length === 0) {
      return (
        <Box display="flex" justifyContent="center" ml={80} mr={-24} mt={36}>
          <Spinner boxSize={12} />
        </Box>
      );
    } else {
      return (
        <Tbody>
          {orders.map((order) => (
            <Tr
              onClick={(e) => {
                if (e.target.tagName !== "SELECT") {
                  navigateTo(`/orders/${order._id}`);
                }
              }}
              fontSize="small"
              key={order._id}
            >
              <Td>{order.user?.name}</Td>
              <Td>{order.address ? order.address.addressLine : "-"}</Td>
              <Td>
                <Box>
                  <Text fontSize={"smaller"}>
                    Order Time: {new Date(order.createdAt).toLocaleString()}
                  </Text>
                  <Text fontSize={"x-small"}>
                    Updated Time: {new Date(order.updatedAt).toLocaleString()}
                  </Text>
                </Box>
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
                <Select
                  key={order._id}
                  colorScheme="whatsapp"
                  variant="outline"
                  placeholder="Change State"
                  onChange={(e) => handleOptionChange(e, order._id)}
                >
                  <option value="accepted">accepted</option>
                  <option value="processing">processing</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                  <option value="pending">pending</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      );
    }
  };

  return (
    <>
      <Box my={4} display="flex">
        <Input
          maxW={"20%"}
          mr={2}
          value={searchTerm}
          placeholder="Search Order"
          onChange={(e) => {
            handleSearchTermChange(e.target.value);
          }}
        ></Input>
        <Select
          value={selectedOption}
          onChange={handleSortingChange}
          maxWidth={200}
          mr={2}
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
      </Box>

      <Table variant="striped">
        <TableCaption>Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Time </Th>
            <Th>Price </Th>
            <Th>Status </Th>
            <Th>Change Status</Th>
          </Tr>
        </Thead>
        {renderTableBody()}
      </Table>
    </>
  );
};

export default OrdersTable;
