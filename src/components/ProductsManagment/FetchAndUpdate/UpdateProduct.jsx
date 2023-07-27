import React, { useState } from "react";
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Icon,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { AdminState } from "../../context/context";

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
      <Heading
        color={"goldenrod"}
        w="100%"
        textAlign="center"
        fontWeight="normal"
        mb="2%"
      >
        Update Product : {productState.name}
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel>Product Name</FormLabel>
          <Input
            name="name"
            value={productState.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          <FormLabel mt={4}>Description</FormLabel>
          <Textarea
            name="description"
            value={productState.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </FormControl>

        <FormControl>
          <FormLabel mt={4}>MRP</FormLabel>
          <Input
            name="mrp"
            value={productState.mrp}
            onChange={handleChange}
            placeholder="Enter product MRP"
          />
          <FormLabel mt={4}>Price</FormLabel>
          <Input
            name="price"
            value={productState.price}
            onChange={handleChange}
            placeholder="(It will be displayed on the website)"
          />
        </FormControl>
      </Flex>
      <FormControl mt="2%" />
    </>
  );
};

const Form2 = ({ productState, setProductState }) => {
  const handleChange = (event, property) => {
    console.log(productState);
    const { value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel mt={4}>Category</FormLabel>
        <Input
          value={productState.category?.name}
          onChange={(e) => handleChange(e, "category")}
          placeholder="Enter product category"
        />
        <FormLabel mt={4}>Brand</FormLabel>
        <Input
          value={productState.brand}
          onChange={(e) => handleChange(e, "brand")}
          placeholder="Enter product brand"
        />
        <FormLabel mt={4}>Material</FormLabel>
        <Input
          value={productState.material}
          onChange={(e) => handleChange(e, "material")}
          placeholder="Enter product material"
        />
        <FormLabel mt={4}>Weight</FormLabel>
        <Input
          value={productState.weight}
          onChange={(e) => handleChange(e, "weight")}
          placeholder="Enter product weight"
        />
        <FormLabel mt={4}>Color</FormLabel>
        <Input
          value={productState.color}
          onChange={(e) => handleChange(e, "color")}
          placeholder="Enter product color"
        />
        <FormErrorMessage>{productState.error}</FormErrorMessage>
      </FormControl>
    </>
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

export default function UpdateProductForm({ product, productID }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [added, setAdded] = useState(false);
  const [productState, setProductState] = useState(product);
  const { user, token, fetchAgain, setFetchAgain, API_BASE_URL } = AdminState();
  const [loading, setLoading] = useState(false);

  const postProduct = async (productData, token) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/products/${productID}`,
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
        title: "Updated",
        description: "Updated Product Successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      setStep((prevState) => prevState + 1);
      setFetchAgain((prev) => !prev);
      setLoading((prev) => false);
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
      setLoading((prev) => false);
    }
  };

  const handleUpdateProduct = async () => {
    setLoading((prev) => true);
    postProduct(productState, token);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setLoading((prev) => false);
  };
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <Box>
        <Button
          colorScheme="yellow"
          size="sm"
          onClick={onOpen}
          isLoading={loading}
          spinner={<BeatLoader size={8} color="white" />}
        >
          <Icon as={BiEdit} />
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Form1
                productState={productState}
                setProductState={setProductState}
              />
            </ModalHeader>
            <ModalBody>
              <Form2
                productState={productState}
                setProductState={setProductState}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                boxShadow={"lg"}
                w="7rem"
                colorScheme="yellow"
                variant="solid"
                isLoading={loading}
                spinner={<BeatLoader size={8} color="white" />}
                onClick={handleUpdateProduct}
              >
                Save
              </Button>
              <Button variant="ghost" ml={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
