import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  Flex,
  HStack,
  Text,
  FormErrorMessage,
  Grid,
  useToast,
  StepSeparator,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import DealerSelectors from "./DealerSelector";

function RegisterForm() {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUploadButtonText1, setImageUploadButtonText1] =
    useState("Upload");
  const [imageUploadButtonText2, setImageUploadButtonText2] =
    useState("Upload");
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternativeNo: "",
    address: "",
    city: "",
    state: "",
    aadharCardNo: "",
    aadharCardImage: null,
    panCardNo: "",
    panCardImage: null,
    dealers: [],
  });
  const { API_LOCAL_URL, token } = AdminState();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${API_LOCAL_URL}/api/admin/register-salesperson`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registration Successful:", response.data);

      // Show success notification
      toast({
        title: "Registration Successful",
        description: "Salesperson registered successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        alternativeNo: "",
        address: "",
        city: "",
        state: "",
        aadharCardNo: "",
        aadharCardImage: null,
        panCardNo: "",
        panCardImage: null,
        dealers: [],
      });
    } catch (error) {
      console.error("Registration Failed:", error);

      // Show error notification
      toast({
        title: "Registration Failed",
        description: "Failed to register salesperson",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    console.log("file----> ", file, fieldName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: file,
    }));
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      console.log("file-> 234 ", file);
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CL_MAIN_UPLOAD_PRESET
      ); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_APP_CL_MAIN_CLOUDNAME
        }/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      console.log("response.data.secure_url-> ", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
  const handleUpload = async () => {
    try {
      setImageUploadLoading(true);
      if (formData.panCardImage && formData.aadharCardImage) {
        const aadharImg = formData.aadharCardImage;
        const panImg = formData.panCardImage;

        console.log("formData.aadharCardImage-> ", aadharImg);
        console.log("formData.panCardImage-> ", panImg);

        const aadharCardImageURL = await uploadImage(aadharImg);

        // Upload panCardImage to Cloudinary
        const panCardImageURL = await uploadImage(panImg);

        // Update form data with the image URLs
        setFormData((prevFormData) => ({
          ...prevFormData,
          aadharCardImage: aadharCardImageURL,
          panCardImage: panCardImageURL,
        }));
        setImageUploadButtonText1("Uploaded");
        setImageUploadButtonText2("Uploaded");
        console.log("Image upload successful");
      } else if (formData.aadharCardImage) {
        const aadharImg = formData.aadharCardImage;
        console.log("formData.aadharCardImage-> ", aadharImg);
        const aadharCardImageURL = await uploadImage(aadharImg);
        setFormData((prevFormData) => ({
          ...prevFormData,
          aadharCardImage: aadharCardImageURL,
        }));
        setImageUploadButtonText1("Uploaded");
      } else if (formData.panCardImage) {
        const panImg = formData.panCardImage;
        console.log("formData.panCardImage-> ", panImg);
        const panCardImageURL = await uploadImage(panImg);
        setFormData((prevFormData) => ({
          ...prevFormData,
          panCardImage: panCardImageURL,
        }));
        setImageUploadButtonText2("Uploaded");
      }
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      console.error("Image upload failed:", error);
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
    console.log("formData:", formData);
    console.log("selectedDealersTop:", selectedDealers);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dealers: selectedDealers,
    }));
  }, [selectedDealers]);

  return (
    <Box mx="auto" maxW="100%" p={8}>
      <Box fontSize="xl" fontWeight="bold" mb={6} textAlign="center">
        Sales Person Registration
      </Box>
      <form onSubmit={handleSubmit}>
        {" "}
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
          {/* <FormControl>
            <FormLabel fontSize="xs">Aadhar Card Image</FormLabel>
            <Input
              type="text"
              placeholder="Enter Aadhar Card Image URL"
              name="aadharCardImage"
              value={formData.aadharCardImage}
              onChange={handleChange}
              fontSize="xs"
            />
          </FormControl> */}
          <FormControl>
            <FormLabel fontSize="xs">Aadhar Card Image</FormLabel>
            <Box borderWidth={"thin"} borderRadius="md" borderColor="gray.300">
              <Flex justify="center" align="center" h="39px">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, "aadharCardImage")
                  }
                />
                <Button
                  as="label"
                  isLoading={imageUploadLoading}
                  htmlFor="aadharCardImage"
                  cursor="pointer"
                  size="sm"
                  onClick={handleUpload}
                >
                  {imageUploadButtonText1}
                </Button>
              </Flex>
            </Box>
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
          {/* <FormControl>
            <FormLabel fontSize="xs">PAN Card Image</FormLabel>
            <Input
              type="text"
              placeholder="Enter PAN Card Image URL"
              name="panCardImage"
              value={formData.panCardImage}
              onChange={handleChange}
              fontSize="xs"
            />
          </FormControl> */}
          <FormControl>
            <FormLabel fontSize="xs">PAN Card Image</FormLabel>
            <Box borderWidth="thin" borderRadius="md" borderColor="gray.300">
              <Flex justify="center" align="center" h="40px">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, "panCardImage")}
                />{" "}
                <Button
                  as="label"
                  isLoading={imageUploadLoading}
                  htmlFor="panCardImage"
                  cursor="pointer"
                  size="sm"
                  onClick={handleUpload}
                >
                  {imageUploadButtonText2}
                </Button>
              </Flex>
            </Box>
          </FormControl>
        </Grid>
        <FormErrorMessage>{formData.error}</FormErrorMessage>
        <hr
          style={{
            margin: "2rem 0",
            width: "100%",
            height: "2px",
          }}
        />{" "}
        {/* Line separator */}
        <DealerSelectors
          setSelectedDealers={setSelectedDealers}
          selectedDealers={selectedDealers}
        />
        <Flex justifyContent="center" mt={8}>
          <Button type="submit" colorScheme="black" bg="black" fontSize="xs">
            Register
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default RegisterForm;
