import React, { useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  HStack,
  IconButton,
  Toast,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { FiCrosshair, FiUpload } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { Image as CloudImage } from "cloudinary-react";

import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { AdminState } from "../../context/context";
import { Form } from "react-router-dom";

const Form1 = ({ productState, setProductState }) => {
  console.log(productState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Flex fontSize={"sm"}>
        <FormControl mr="5%">
          <FormLabel fontSize={"x-small"}>Product Name</FormLabel>
          <Input
            fontSize={"x-small"}
            name="name"
            value={productState.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {/* Description commented here this time it not neeeded might be needed later on */}
          {/* <FormLabel fontSize={"x-small"} mt={4}>
            Description
          </FormLabel>
          <Textarea
            name="description"
            value={productState.description}
            onChange={handleChange}
            placeholder="Enter product description"
          /> */}
        </FormControl>

        {/* <FormControl>
          <FormLabel fontSize={"x-small"} mt={4}>
            MRP
          </FormLabel>
          <Input
            fontSize={"x-small"}
            name="mrp"
            value={productState.mrp}
            onChange={handleChange}
            placeholder="Enter product MRP"
          />
          <FormLabel fontSize={"x-small"} mt={4}>
            Price
          </FormLabel>
          <Input
            fontSize={"x-small"}
            name="price"
            value={productState.price}
            onChange={handleChange}
            placeholder="(It will be displayed on the website)"
          />
        </FormControl> */}
      </Flex>
      <FormControl mt="2%" />
    </>
  );
};

const Form2 = ({ productState, setProductState }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with default selected category if needed
  const weightOptions = ["18", "20", "22", "24"];
  const { API_BASE_URL } = AdminState();
  const handleChange = (event, property) => {
    console.log(productState);
    const { value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    //get all categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/categories`
        );
        console.log("response.data", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("error-> ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setProductState((prevState) => {
      return {
        ...prevState,
        category: event.target.value,
      };
    });
  };

  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel fontSize={"x-small"}>Category</FormLabel>
        <HStack
          // bg={"red"}
          display={"flex"}
          width={"100%"}
          alignItems={"baseline"}
          mb={-8}
        >
          <Select
            flex={4}
            mb={4}
            fontSize={"x-small"}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
          <Text fontSize={"x-small"}>or</Text>
          <Box flex={4}>
            <Input
              mt={4}
              isDisabled={selectedCategory !== ""}
              fontSize={"x-small"}
              value={productState.category}
              onChange={(e) => handleChange(e, "category")}
              placeholder="Enter product category"
            />
          </Box>
        </HStack>
        <Flex
          margin={"auto"}
          ml={-2}
          width={"100%"}
          wrap={"wrap"}
          m={8}
          alignItems={"baseline"}
        >
          {/* Brand is commented because this time not needed might be needed later on */}
          {/* <FormControl fontSize={"x-small"} width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              Brand
            </FormLabel>
            <Input
              value={productState.brand}
              onChange={(e) => handleChange(e, "brand")}
              placeholder="Enter product brand"
            />
          </FormControl> */}
          <FormControl width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              Material
            </FormLabel>
            <Input
              fontSize={"x-small"}
              value={productState.material}
              onChange={(e) => handleChange(e, "material")}
              placeholder="Enter product material"
            />
          </FormControl>
          <FormControl width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              Weight
            </FormLabel>
            <Select
              fontSize={"x-small"}
              value={productState.weight}
              onChange={(e) => handleChange(e, "weight")}
              placeholder="Select product weight"
            >
              {weightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* Color is commented because this time not needed might be needed later on */}
          {/* <FormControl width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              Color
            </FormLabel>
            <Input
              fontSize={"x-small"}
              value={productState.color}
              onChange={(e) => handleChange(e, "color")}
              placeholder="Enter product color"
            />
          </FormControl> */}
          <FormControl width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              MRP
            </FormLabel>
            <Input
              fontSize={"x-small"}
              name="mrp"
              value={productState.mrp}
              onChange={handleChange2}
              placeholder="Enter product MRP"
            />
          </FormControl>
          <FormControl width={"50%"} p={2}>
            <FormLabel fontSize={"x-small"} mt={4}>
              Price
            </FormLabel>
            <Input
              fontSize={"x-small"}
              name="price"
              value={productState.price}
              onChange={handleChange2}
              placeholder="(It will be displayed on the website)"
            />
          </FormControl>
        </Flex>

        <FormErrorMessage>{productState.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

const ImageFormCloudinary = ({
  productState,
  setProductState,
  setDisabled,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false); // For the upload button
  const toast = useToast();
  const handleFileChange = (event) => {
    if (previewUrls.length >= 5) {
      toast({
        title: "Maximum 5 images allowed.",
        description: "You can only upload 5 images.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return; // Limit to maximum 5 files
    }
    const files = Array.from(event.target.files).slice(0, 5); // Limit to maximum 5 files
    console.log("filehereeeee-> ", files);
    setSelectedFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
    console.log("selectedFiles", selectedFiles);
  };

  const handleUpload = async () => {
    setDisabled((prev) => true);
    setLoading((prev) => true);
    // Upload logic for multiple images using Cloudinary API here
    const uploadPromises = selectedFiles.map((file) => {
      const formData = new FormData();
      console.log("file--->", file);
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CL_MAIN_UPLOAD_PRESET
      );
      console.log(
        "upload_preset",
        import.meta.env.VITE_APP_CL_MAIN_UPLOAD_PRESET
      );
      return fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_APP_CL_MAIN_CLOUDNAME
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());
    });

    // Handle the response and any additional logic after the upload is complete for each image
    Promise.all(uploadPromises)
      .then((results) => {
        const images = results.map((result) => result.secure_url);
        setProductState((prevState) => {
          const updatedState = { ...prevState }; // Create a shallow copy of prevState
          updatedState.images = [...(updatedState.images || []), ...images]; // Merge images array into the "images" property
          return updatedState;
        });

        setLoading((prev) => false);
        setDisabled((prev) => false);
        console.log(results);
      })
      .catch((error) => {
        setLoading((prev) => false);
        toast({
          title: "Failed to upload images.",
          description: `Some Error Happend : z${error}`,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        setDisabled((prev) => false);
        console.error(error);
      });
  };

  return (
    <Box>
      <HStack>
        {previewUrls.length > 0
          ? previewUrls.map((url, index) => (
              <Box>
                <IconButton
                  position={"sticky"}
                  onClick={(e) => {
                    console.log("Clicked", url);
                    const newPreviewUrls = previewUrls.filter((url, i) => {
                      return i !== index;
                    });
                    console.log(selectedFiles, previewUrls);

                    setPreviewUrls((prev) => [...newPreviewUrls]);
                    setSelectedFiles((prev) => [...newPreviewUrls]);
                    console.log("newPreviewUrls", newPreviewUrls);
                  }}
                  icon={<ImCross />}
                ></IconButton>
                <CloudImage
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width="200px"
                  height="200px"
                />{" "}
              </Box>
            ))
          : null}
      </HStack>

      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        textAlign="center"
      >
        <IconButton
          as="label"
          htmlFor="file"
          icon={<FiUpload />}
          fontSize="2xl"
          mb={2}
        />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple // Allow multiple file selection
          accept="image/*"
          max="5" // Limit to maximum 5 files
        />
        <Box>Upload up to 5 images</Box>
      </Box>

      {selectedFiles.length > 0 && (
        <Box mt={4}>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FiUpload />}
              colorScheme="pink"
              isLoading={loading}
              variant="solid"
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Add Product
      </Heading>
    </>
  );
};

export default function MultiStepForm() {
  const { token, API_BASE_URL } = AdminState();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [productState, setProductState] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    category: "",
    brand: "",
    material: "",
    size: "",
    weight: "",
    color: "",
    error: "",
    images: [],
  });

  const postProduct = async (productData, token, API_BASE_URL) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post request successful:", response.data);

      toast({
        title: "Product Added Successfully.",
        description: "We've created your product for you.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      setStep((prevState) => prevState + 1);
      // Perform any additional actions or handle the response as needed
    } catch (error) {
      console.error("Error while making the post request:", error);
      // Handle the error condition

      toast({
        title: "Failed to add product.",
        description: `Some Error Happend : z${error}`,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    postProduct(productState, token, API_BASE_URL);
  };

  return (
    <>
      {
        <Box fontSize={"sm"}>
          <Form1
            productState={productState}
            setProductState={setProductState}
          />
          <Form2
            productState={productState}
            setProductState={setProductState}
          />
          <ImageFormCloudinary
            productState={productState}
            setProductState={setProductState}
            disabled={disabled}
            setDisabled={setDisabled}
          />
          <Box display={"flex"} justifyContent={"center"} m={8} p={4}>
            <Button
              boxShadow={"lg"}
              w="7rem"
              colorScheme="yellow"
              variant="solid"
              isLoading={loading}
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleAddProduct}
              isDisabled={disabled}
            >
              Submit
            </Button>
          </Box>
        </Box>
      }
    </>
  );
}
