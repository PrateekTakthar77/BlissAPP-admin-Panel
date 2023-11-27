// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   chakra,
//   Select,
//   useToast,
//   Spinner,
//   Text,
//   Box,
//   Input,
//   Button,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { AdminState } from "../../context/context";
// import { useNavigate } from "react-router-dom";
// let setTimeOutID1;
// const OrdersTable = () => {
//   const { token, API_BASE_URL } = AdminState();
//   const toast = useToast();
//   const navigateTo = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [allOrders, setAllOrders] = useState([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isOrderStatusUpdate, setIsOrderStatusUpdate] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("none");
//   const [selectedSort, setSelectedSort] = useState("none");
//   const [discountAmounts, setDiscountAmounts] = useState({});
//   const [message, setMessage] = useState("");

//   const handleSendMessgae = async (orderId) => {
//     console.log(orderId);
//     try {
//       const response = await axios.post(
//         `http://localhost:5009/api/checkouts/send`,
//         {
//           message: setMessage,
//           orderId,
//         }
//       );
//       setMessage("");
//       // console.log(response.data);
//       // setIsOrderStatusUpdate((prev) => !prev);
//       toast({
//         title: "Order Status Updated",
//         description: "Order Status Updated Successfully",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//         position: "top-left",
//       });
//     } catch (error) {
//       toast({
//         title: "Order Status Update Failed",
//         description: "Order Status Update Failed",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   // Function to handle discount submission
//   const handleDiscountSubmit = async (orderId, discountAmount) => {
//     console.log("Received request with orderId :", orderId);
//     console.log("Received request with DISCOUNT:", discountAmount);
//     try {
//       // Send a POST request to the API
//       const response = await axios.post(
//         `http://localhost:5009/api/checkouts/discount`,
//         {
//           orderId,
//           discountAmount,
//         }
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         // }
//       );
//       // Handle the response as needed
//       console.log(response.data);

//       toast({
//         title: "Discount Applied",
//         description: "Discount applied successfully.",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//         position: "top-left",
//       });
//     } catch (error) {
//       // Handle errors
//       console.error(error);

//       toast({
//         title: "Discount Application Failed",
//         description: "Failed to apply the discount.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   const handleSortingChange = (event) => {
//     const selectedValue = event.target.value;
//     if (selectedValue === "none") {
//       setSelectedFilter("none");
//       setSelectedSort("none");
//     } else if (selectedValue === "time") {
//       setSelectedFilter("time");
//     } else if (selectedValue === "price") {
//       setSelectedFilter("price");
//     } else if (selectedValue === "status") {
//       setSelectedFilter("status");
//     }
//   };

//   const handleOptionChange = async (event, orderId) => {
//     const selectedValue = event.target.value;
//     setSelectedOption(selectedValue);
//     console.log(token);
//     try {
//       const response = await axios.put(
//         `http://localhost:5009/api/checkouts/state/${orderId}`,
//         {
//           statusState: selectedValue,
//           orderId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       setIsOrderStatusUpdate((prev) => !prev);
//       toast({
//         title: "Order Status Updated",
//         description: "Order Status Updated Successfully",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//         position: "top-left",
//       });
//     } catch (error) {
//       toast({
//         title: "Order Status Update Failed",
//         description: "Order Status Update Failed",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("-->", response.data);
//         const sortedOrders = response.data.reverse();
//         setAllOrders(sortedOrders);
//         setOrders(sortedOrders);
//       } catch (error) {
//         console.error(error);
//         setError(
//           (prev) =>
//             error.response.data.message ||
//             error.response.data.error ||
//             error.message ||
//             "Error while fetching orders"
//         );
//       }
//     };

//     fetchOrders();
//   }, [isOrderStatusUpdate]);

//   useEffect(() => {
//     let filteredOrders = [...allOrders];
//     if (selectedFilter === "none" && selectedSort === "none") {
//       setOrders(allOrders);
//       return;
//     }
//     if (selectedFilter === "time") {
//       filteredOrders = filteredOrders.sort(
//         (a, b) =>
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       );
//     } else if (selectedFilter === "price") {
//       filteredOrders = filteredOrders.sort((a, b) => a.total - b.total);
//     } else if (selectedFilter === "status") {
//       filteredOrders = filteredOrders.filter((a) => a.state === "pending");
//     }

//     if (selectedSort === "asc") {
//       filteredOrders.reverse();
//     }

//     setOrders(filteredOrders);
//   }, [selectedFilter, selectedSort]);

//   const callSearchNow = (searchTerm) => {
//     let filteredOrders = [...allOrders];
//     console.log("searchTerm-->:", searchTerm);
//     filteredOrders = filteredOrders.filter((order) => {
//       if (order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//         return true;
//       } else if (
//         order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         return true;
//       } else if (
//         order.user.mobile.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         return true;
//       } else if (
//         order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         return true;
//       } else if (order.total.toString().includes(searchTerm.toLowerCase())) {
//         return true;
//       } else if (
//         order.items.some((item) => {
//           if (
//             item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
//           ) {
//             console.log(
//               "item:",
//               item.product.name.toLowerCase(),
//               searchTerm,
//               "true"
//             );
//             return true;
//           }
//         })
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//       console.log("order:", order.user.name.toLowerCase(), searchTerm);
//     });
//     if (filteredOrders.length <= 0) {
//       toast({
//         title: "No Orders Found",
//         description: "No Orders Found",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//       setError("No Orders Found");
//       setOrders(allOrders);
//       if (!error) {
//         setTimeout(() => {
//           setError(null);
//         }, 2000);
//       }
//       return;
//     }
//     setOrders(filteredOrders);
//   };

//   const handleSearchTermChange = (value) => {
//     setSearchTerm((prev) => value);
//     if (setTimeOutID1) {
//       console.log("clearing timeout", setTimeOutID1);
//       clearTimeout(setTimeOutID1);
//     }

//     setTimeOutID1 = setTimeout(() => {
//       callSearchNow(value);
//     }, 370);
//   };

//   const renderTableBody = () => {
//     if (error) {
//       return <Box>{error}</Box>;
//     } else if (orders.length === 0) {
//       return (
//         <Box display="flex" justifyContent="center" ml={80} mr={-24} mt={36}>
//           <Spinner boxSize={12} />
//         </Box>
//       );
//     } else {
//       return (
//         <>
//           <Tbody>
//             {orders.map((order) => (
//               <Tr
//               // onClick={(e) => {
//               //   if (e.target.tagName !== "SELECT") {
//               //     navigateTo(`/orders/${order._id}`);
//               //   }
//               // }}
//               // fontSize="small"
//               // key={order._id}
//               >
//                 {/* <Td>{order.user?.name}</Td> */}
//                 <Td>{order.address ? order.address.addressLine : "-"}</Td>
//                 <Td>
//                   <Box>
//                     <Text fontSize={"smaller"}>
//                       Order Time: {new Date(order.createdAt).toLocaleString()}
//                     </Text>
//                     <Text fontSize={"x-small"}>
//                       Updated Time: {new Date(order.updatedAt).toLocaleString()}
//                     </Text>
//                   </Box>
//                 </Td>
//                 <Td color="blue.500" fontWeight="bold">
//                   {order.total + "₹"}
//                 </Td>
//                 <Td
//                   color={
//                     order.status === "pending" || order.status === "cancelled"
//                       ? "red"
//                       : order.status === "processing"
//                       ? "blue"
//                       : "green"
//                   }
//                 >
//                   {order.status}
//                 </Td>
//                 <Td>
//                   <Select
//                     key={order._id}
//                     colorScheme="whatsapp"
//                     variant="outline"
//                     placeholder="Change State"
//                     onChange={(e) => handleOptionChange(e, order._id)}
//                   >
//                     <option value="accepted">accepted</option>
//                     <option value="processing">processing</option>
//                     <option value="delivered">delivered</option>
//                     <option value="cancelled">cancelled</option>
//                     <option value="pending">pending</option>
//                   </Select>
//                 </Td>
//                 {/* Add a table cell for discount input */}
//                 <Td>
//                   <Input
//                     // border="1px"
//                     // borderColor="black"
//                     // ml="50px"
//                     mb="2px"
//                     // size="sm"
//                     width="60%"
//                     value={discountAmounts[order.orderId] || ""}
//                     placeholder="Enter Discount"
//                     onChange={(e) =>
//                       setDiscountAmounts((prev) => ({
//                         ...prev,
//                         [order.orderId]: e.target.value,
//                       }))
//                     }
//                   />
//                   <Button
//                     // ml="50px"
//                     // border="1px"
//                     // borderColor="black"
//                     onClick={() => {
//                       // Call the handleDiscountSubmit function here with order._id and discountAmounts[order._id]
//                       handleDiscountSubmit(
//                         order.orderId,
//                         discountAmounts[order.orderId]
//                       );
//                     }}
//                   >
//                     Apply Discount
//                   </Button>
//                 </Td>
//                 {/* <Td>
//                 <Button
//                   onClick={() => navigateTo(`/orders/${order._id}`)}
//                   colorScheme="blue"
//                   size="sm"
//                 >
//                   View Details
//                 </Button>
//               </Td> */}
//                 <Input
//                   // border="1px"
//                   // borderColor="black"
//                   // ml="50px"
//                   mb="2px"
//                   // size="sm"
//                   width="100%"
//                   placeholder="Enter message"
//                   onChange={(e) => setMessage}
//                 />
//                 <Button
//                   // ml="50px"
//                   // border="1px"
//                   // borderColor="black"
//                   onClick={() => {
//                     // Call the handleSendMessgae function here with order._id
//                     handleSendMessgae(order._id);
//                   }}
//                 >
//                   Apply Discount
//                 </Button>
//               </Tr>
//             ))}
//           </Tbody>
//           {/* <Input
//             // border="1px"
//             // borderColor="black"
//             // ml="50px"
//             mb="2px"
//             // size="sm"
//             width="100%"
//             placeholder="Enter Discount"
//             onChange={(e) => setMessage}
//           />
//           <Button
//             // ml="50px"
//             // border="1px"
//             // borderColor="black"
//             onClick={() => {
//               // Call the handleDiscountSubmit function here with order._id and discountAmounts[order._id]
//               handleSendMessgae(order.orderId);
//             }}
//           >
//             Apply Discount
//           </Button> */}
//         </>
//       );
//     }
//   };

//   return (
//     // <>
//     //   <Box my={4} display="flex">
//     //     <Input
//     //       maxW={"20%"}
//     //       mr={2}
//     //       value={searchTerm}
//     //       placeholder="Search Order"
//     //       onChange={(e) => {
//     //         handleSearchTermChange(e.target.value);
//     //       }}
//     //     ></Input>
//     //     <Select
//     //       value={selectedOption}
//     //       onChange={handleSortingChange}
//     //       maxWidth={200}
//     //       mr={2}
//     //     >
//     //       <option value="none">Filter</option>
//     //       <option value="none">None</option>
//     //       <option value="time">Sort by Time</option>
//     //       <option value="price">Sort by Price</option>
//     //       <option value="status">Sort by Status</option>
//     //     </Select>
//     //     <Select
//     //       value={selectedSort}
//     //       onChange={(e) => setSelectedSort(e.target.value)}
//     //       maxWidth={120}
//     //     >
//     //       <option value="none">Sort</option>
//     //       <option value="none">None</option>
//     //       <option value="asc">Ascending</option>
//     //       <option value="desc">Descending</option>
//     //     </Select>
//     //   </Box>

//     //   <Table variant="striped">
//     //     <TableCaption>Orders</TableCaption>
//     //     <Thead>
//     //       <Tr>
//     //         {/* <Th>User</Th> */}
//     //         <Th>Address</Th>
//     //         <Th>Time </Th>
//     //         <Th>Price </Th>
//     //         <Th>Status </Th>
//     //         <Th>Change Status</Th>
//     //         <Th>Give Discount</Th>
//     //       </Tr>
//     //     </Thead>
//     //     {renderTableBody()}
//     //   </Table>
//     // </>
//     <>
//       {/* Search and Sorting Controls */}
//       <Box my={4} display="flex">
//         <Input
//           maxW="20%"
//           mr={2}
//           value={searchTerm}
//           placeholder="Search Order"
//           onChange={(e) => handleSearchTermChange(e.target.value)}
//         />
//         <Select
//           value={selectedOption}
//           onChange={handleSortingChange}
//           maxWidth={200}
//           mr={2}
//         >
//           {/* ... (options) */}
//         </Select>
//         <Select
//           value={selectedSort}
//           onChange={(e) => setSelectedSort(e.target.value)}
//           maxWidth={120}
//         >
//           {/* ... (options) */}
//         </Select>
//       </Box>

//       {/* Orders Table */}
//       <Table variant="striped">
//         <TableCaption>Orders</TableCaption>
//         <Thead>
//           <Tr>{/* ... (table headers) */}</Tr>
//         </Thead>
//         <Tbody>{renderTableBody()}</Tbody>
//       </Table>
//     </>
//   );
// };

// export default OrdersTable;

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
  Button,
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
  const [discountAmounts, setDiscountAmounts] = useState({});
  const [message, setMessage] = useState("");

  const handleSendMessgae = async (orderId, setMessage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/checkouts/send`, {
        message: setMessage,
        orderId,
      });
      // setMessage("");
      toast({
        title: "Message Sent Succesfully",
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

  const handleDiscountSubmit = async (orderId, discountAmount) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/checkouts/discount`,
        {
          orderId,
          discountAmount,
        }
      );
      console.log(response.data);
      toast({
        title: "Discount Applied",
        description: "Discount applied successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Discount Application Failed",
        description: "Failed to apply the discount.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/checkouts/state/${orderId}`,
        {
          status: selectedValue,
        }
      );
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
        const sortedOrders = response.data.reverse();
        setAllOrders(sortedOrders);
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error);
        setError(
          (prev) =>
            error.response?.data?.message ||
            error.response?.data?.error ||
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
        order.items.some((item) =>
          item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
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
    setSearchTerm(value);
    if (setTimeOutID1) {
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
        <>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.address ? order.address.addressLine : "-"}</Td>
                <Td>
                  <Box>
                    <Text fontSize="small">
                      Order Time: {new Date(order.createdAt).toLocaleString()}
                    </Text>
                    <Text fontSize="x-small">
                      Updated Time: {new Date(order.updatedAt).toLocaleString()}
                    </Text>
                  </Box>
                </Td>
                <Td color="blue.500" fontWeight="bold">
                  {order.total + "₹"}
                </Td>
                <Td
                  color={
                    order.status === "pending" || order.status === "cancelled"
                      ? "red"
                      : order.status === "processing"
                      ? "blue"
                      : "green"
                  }
                >
                  {order.status}
                </Td>
                <Td>
                  <Select
                    key={order._id}
                    colorScheme="whatsapp"
                    variant="outline"
                    placeholder="Change State"
                    width="140px"
                    onChange={(e) => handleOptionChange(e, order._id)}
                  >
                    <option value="accepted">accepted</option>
                    <option value="processing">processing</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                    <option value="pending">pending</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    // mb="2px"
                    // width="60%"
                    value={discountAmounts[order.orderId] || ""}
                    placeholder="Enter Discount"
                    onChange={(e) =>
                      setDiscountAmounts((prev) => ({
                        ...prev,
                        [order.orderId]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={() =>
                      handleDiscountSubmit(
                        order.orderId,
                        discountAmounts[order.orderId]
                      )
                    }
                  >
                    Apply Discount
                  </Button>
                </Td>
                <Td>
                  <Input
                    mb="2px"
                    width="100%"
                    placeholder="Enter message"
                    // onChange={(e) => setMessage(e.target.value)}
                    value={message} // Use the value prop to bind the input to the message state
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {/* <Button
                    onClick={() => handleSendMessgae(order._id, setMessage)}
                  >
                    Send Message
                  </Button> */}
                  <Button onClick={() => handleSendMessgae(order._id, message)}>
                    Send Message
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </>
      );
    }
  };

  return (
    <>
      {/* Search and Sorting Controls */}
      <Box my={4} display="flex">
        <Input
          maxW="20%"
          mr={2}
          value={searchTerm}
          placeholder="Search Order"
          onChange={(e) => handleSearchTermChange(e.target.value)}
        />
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

      {/* Orders Table */}
      <Table variant="striped">
        {/* <TableCaption>Orders</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Time</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th>Change Status</Th>
            <Th>Give Discount</Th>
            <Th>Send Message</Th>
          </Tr>
        </Thead>
        {renderTableBody()}
      </Table>
      <center>Total Orders</center>
    </>
  );
};

export default OrdersTable;
