import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Spinner,
  Input,
  Icon,
  Portal,
  Toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import UpdateProductForm from "./UpdateProduct";
import { AdminState } from "../../context/context";
import SiteTableSkeleton from "../../Skeletons/SiteTableSkeleton";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
const ProductGrid = ({ searchTerm, setSearchLoading, searchLoading }) => {
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUpdateProduct, setCurrentUpdateProduct] = useState({});
  const [deleteProductID, setDeleteProductID] = useState(null);
  const { user, token, fetchAgain, API_BASE_URL } = AdminState();
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const toast = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchAgain]);

  const fetchProducts = async () => {
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/api/products`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setProducts(response.data);
    //   setFilteredProducts(setProducts.reverse());
    // } catch (error) {
    //   console.error("Error fetching products:", error);
    //   setError(
    //     (prev) =>
    //       error.response.data.message ||
    //       error.response.data.error ||
    //       error.message ||
    //       "Error while fetching products"
    //   );
    // }
    const response = await axios.get(`${API_BASE_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.data) {
      setProducts(response.data);
      setFilteredProducts(response.data.reverse());
    } else {
      // Handle the case where response or response.data is undefined
      console.error("Error fetching products. Response:", response);
      setError("Error while fetching products");
    }
  };

  const handleUpdateProduct = async (productID, product) => {
    //logic to handle updating a product
    console.log("Updating product:", product);
    setIsUpdate((prev) => !prev);
    setCurrentUpdateProduct(product);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/products/delete`,
        { data: { productId } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleDeleteProduct = async (productID, product) => {
    //  the logic to handle deleting a product from the database
    console.log("Deleting product:", productID);
    try {
      const response = await deleteProduct(productID);
      console.log("response:", response);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productID)
      );
      setIsPopoverOpen(false);
      toast({
        titile: "Deleted",
        description: "Deleted Product Successfully.",
        status: "success",
        position: "top",
        duration: 2000,
      });
      setFilteredProducts((prev) =>
        prev.filter((product) => product._id !== productID)
      );
    } catch (error) {
      console.error(error); // Handle error or display error message
    }
  };

  const descriptionStyle = {
    color: "gray",
    fontSize: "14px",
    maxHeight: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setTimeout(() => {
      setSearchLoading((prev) => false);
    }, 1000);
  }, [searchTerm]);

  const ThArr = ["Image", "Name", "Category", "SubCategory", "Actions"];
  return (
    <>
      {error ? (
        <Box>{error}</Box>
      ) : (
        <>
          {searchLoading ? (
            <Box maxW={"100%"} minW={"100%"} margin={2}>
              <SiteTableSkeleton ThArr={ThArr} />
            </Box>
          ) : (
            <>
              {filteredProducts?.length > 0 ? (
                <Box maxW={"100%"} minW={"100%"}>
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        {/* <Th>Image</Th> */}
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Subcategory</Th>
                        {/* <Th>Description</Th> */}
                        {/* <Th isNumeric>MRP</Th> */}
                        {/* <Th isNumeric>Website Price</Th> */}
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredProducts?.map((product) => (
                        <Tr fontSize={"x-small"} key={product.id}>
                          <Td>
                            <Image
                              width={"12"}
                              maxH={12}
                              src={product.images[0]}
                            />
                          </Td>
                          <Td fontWeight="bold">{product.name}</Td>
                          <Td pl={12}>
                            {product.category?.name || product.category || "-"}
                          </Td>
                          {/* <Td> */}
                          {/* <p style={descriptionStyle}>{product.description}</p> */}
                          {/* </Td> */}
                          {/* <Td fontSize={"sm"}>₹{product.mrp}</Td> */}
                          {/* <Td fontWeight="bold">₹{product.price}</Td> */}
                          <Td>
                            <Box display="flex" justifyContent="center">
                              <UpdateProductForm
                                key={product._id}
                                product={product}
                                productID={product._id}
                              />

                              <Popover>
                                <PopoverTrigger>
                                  <Button
                                    onClick={() => {
                                      setDeleteProductID((prev) => product._id);
                                    }}
                                    colorScheme="red"
                                    size="sm"
                                    ml={2}
                                  >
                                    <Icon as={MdDelete} />
                                  </Button>
                                </PopoverTrigger>
                                <Portal>
                                  <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                      <Button
                                        colorScheme="red"
                                        size="sm"
                                        isDisabled={
                                          deleteProductID !== product._id
                                        }
                                        ml={2}
                                        onClick={() => {
                                          handleDeleteProduct(
                                            product._id,
                                            product
                                          );
                                        }}
                                      >
                                        {"Delete  "} <Icon as={MdDelete} />
                                      </Button>
                                    </PopoverBody>
                                    <PopoverFooter>
                                      Are you sure you want to delete this
                                      product?
                                    </PopoverFooter>
                                  </PopoverContent>
                                </Portal>
                              </Popover>
                            </Box>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ) : (
                <Box maxW={"100%"} minW={"100%"} margin={4}>
                  <SiteTableSkeleton ThArr={ThArr} />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductGrid;
