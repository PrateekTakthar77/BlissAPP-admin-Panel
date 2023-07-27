import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Flex,
  Grid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import DealerSelectors2 from "./DealerSelector2";

function UpdatePerson() {
  const { API_LOCAL_URL, token } = AdminState();
  const { personId } = useParams();
  const [salesperson, setSalesperson] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        const response = await axios.get(
          `${API_LOCAL_URL}/api/admin/salesperson/${personId}`
        );
        setSalesperson(response.data?.salesperson);
        setLoading(false);
        console.log("salesperson:", response.data, API_LOCAL_URL);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch salesperson data");
      }
    };

    fetchSalesperson();
  }, [API_LOCAL_URL, personId]);

  const [formData, setFormData] = useState({});
  const [selectedDealers, setSelectedDealers] = useState([]);
  useEffect(() => {
    setFormData({
      name: salesperson?.name || "",
      email: salesperson?.email || "",
      phone: salesperson?.phone || "",
      alternativeNo: salesperson?.alternativeNo || "",
      address: salesperson?.address || "",
      city: salesperson?.city || "",
      state: salesperson?.state || "",
      dealers: salesperson?.dealers || [],
      aadharCardNo: salesperson?.aadharCardNo || "",
      aadharCardImage: salesperson?.aadharCardImage || "",
      panCardNo: salesperson?.panCardNo || "",
      panCardImage: salesperson?.panCardImage || "",
    });
  }, [salesperson]);

  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${API_LOCAL_URL}/api/admin/salesperson/${personId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registration Successful:", response.data);
      setSalesperson(response.data?.salesperson);
      // Show success notification
      toast({
        title: "Updated Successful",
        description: "Salesperson Updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form data
      setFormData({
        name: salesperson?.name || "",
        email: salesperson?.email || "",
        phone: salesperson?.phone || "",
        alternativeNo: salesperson?.alternativeNo || "",
        address: salesperson?.address || "",
        city: salesperson?.city || "",
        state: salesperson?.state || "",
        aadharCardNo: salesperson?.aadharCardNo || "",
        aadharCardImage: salesperson?.aadharCardImage || "",
        panCardNo: salesperson?.panCardNo || "",
        panCardImage: salesperson?.panCardImage || "",
        dealers: salesperson?.dealers || [],
      });
    } catch (error) {
      console.error("Registration Failed:", error);

      // Show error notification
      toast({
        title: "Registration Failed",
        description:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data?.error.message ||
          "Some Error Occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (salesperson?.dealers?.length > 0) {
      const formDataDealersIds = salesperson.dealers?.map(
        (dealer) => dealer?._id
      );
      setSelectedDealers([...formDataDealersIds]);
      console.log("salesperson.dealers:", salesperson.dealers);
    }
  }, [salesperson]);

  const handleBack = () => {
    navigateTo("/salesperson");
  };

  useEffect(() => {
    console.log("selectedDealers:", selectedDealers);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dealers: selectedDealers,
    }));
  }, [selectedDealers]);

  return (
    <>
      {!loading ? (
        <Box mx="auto" maxW="100%" p={8}>
          <Button onClick={handleBack}>Go Back</Button>
          <hr
            style={{
              margin: "1rem 0",
              width: "100%",
              height: "3px",
            }}
          />
          <Box fontSize="xl" fontWeight="bold" mb={6} textAlign="center">
            Sales Person Registration {console.log("salesperson:", formData)}
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel fontSize="xs">Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Alternative No.</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter Alternative No."
                  name="alternativeNo"
                  value={formData.alternativeNo}
                  onChange={handleChange}
                  fontSize="xs"
                />
              </FormControl>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel fontSize="xs">Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fontSize="xs"
                  />
                </FormControl>
              </GridItem>

              <FormControl>
                <FormLabel fontSize="xs">City</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">State</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Aadhar Card No.</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Aadhar Card No."
                  name="aadharCardNo"
                  value={formData.aadharCardNo}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">Aadhar Card Image</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Aadhar Card Image URL"
                  name="aadharCardImage"
                  value={formData.aadharCardImage}
                  onChange={handleChange}
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">PAN Card No.</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter PAN Card No."
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleChange}
                  required
                  fontSize="xs"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs">PAN Card Image</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter PAN Card Image URL"
                  name="panCardImage"
                  value={formData.panCardImage}
                  onChange={handleChange}
                  fontSize="xs"
                />
              </FormControl>
            </Grid>
            <hr
              style={{
                margin: "2rem 0",
                width: "100%",
                height: "2px",
              }}
            />{" "}
            {/* Line separator */}
            <DealerSelectors2
              formData={formData}
              setSelectedDealers={setSelectedDealers}
              selectedDealers={selectedDealers}
            />
            <Flex justifyContent="center" mt={8}>
              <Button
                type="submit"
                colorScheme="black"
                bg="black"
                fontSize="xs"
              >
                Update
              </Button>
            </Flex>
          </form>
        </Box>
      ) : (
        <Box mx="auto" maxW="100%" p={8}>
          Loading...
        </Box>
      )}
    </>
  );
}

export default UpdatePerson;
