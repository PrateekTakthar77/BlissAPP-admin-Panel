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
  Image,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { format } from "date-fns"; // Import the format function
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useNavigate } from "react-router-dom";

const CustomOrders = () => {
  const navigateTo = useNavigate();
  const [makingCharges, setMakingCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { API_BASE_URL } = AdminState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetchMakingCharges();
  }, []);

  const fetchMakingCharges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/customorders/`);
      setMakingCharges(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error while fetching making charges");
      setLoading(false);
    }
  };

  const handleOptionChange = async (event, orderId) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(token);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/customorders/state/${selectedValue}`,
        {
          status: selectedValue,
          orderId,
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

  return (
    <Box>
      {/* Add a heading here */}
      <Center>
        <Heading as="h1" size="l" mb="4" mt="2">
          CUSTOM ORDER BOOKING LIST
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
                {/* <Th>Type</Th> */}
                <Th>Category</Th>
                <Th>Subcategory</Th>
                <Th>Purity</Th>
                <Th>Weight</Th>
                <Th>Quantity</Th>
                {/* <Th>Image</Th> */}
              </Tr>
            </Thead>
            {/* <Tbody>
              {makingCharges.map((data, index) => (
                <Tr key={data._id}>
                  <Td>{data.typeofproduct}</Td>
                  <Td>{data.purity}</Td>
                  <Td>{data.weight}</Td>
                  <Td>{data.quantity}</Td>
                  <Td>
                    <Image
                      width={"12"}
                      maxH={12}
                      src={data.images[0]}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody> */}
            <Tbody>
              {makingCharges.map((data, index) => (
                <Tr key={data._id}>
                  {/* <Td>{data.typeofproduct}</Td> */}
                  <Td>{data.category}</Td>
                  <Td>{data.subcategory}</Td>
                  <Td>{data.purity}</Td>
                  <Td>{data.weight}</Td>
                  <Td>{data.quantity}</Td>
                  {/* <Td>
                    <Image
                      width={"12"}
                      maxH={12}
                      src={data.images[0]}
                      alt={`Image ${index}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  </Td> */}
                  {/*  */}
                  {/* <Td
                    color={
                      data.status === "pending" || data.status === "cancelled"
                        ? "red"
                        : data.status === "processing"
                        ? "blue"
                        : "green"
                    }
                  >
                    {data.status}
                  </Td>
                  <Td>
                    <Select
                      key={data._id}
                      colorScheme="whatsapp"
                      variant="outline"
                      placeholder="Change State"
                      onChange={(e) => handleOptionChange(e, data._id)}
                    >
                      <option value="accepted">accepted</option>
                      <option value="cancelled">cancelled</option>
                    </Select>
                  </Td> */}
                  {/*  */}
                  {/* <Td>
                    <Button
                      onClick={() =>
                        navigateTo(`/Singlecustomorders/${data._id}`)
                      }
                      colorScheme="blue"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
          {selectedImageIndex !== null && (
            <Gallery
              items={makingCharges.map((data) => ({
                original: data.images[0],
              }))}
              startIndex={selectedImageIndex}
              onRequestClose={() => setSelectedImageIndex(null)}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default CustomOrders;
