import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Spinner,
  Icon,
  Portal,
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
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const ProductGrid = ({ searchTerm, setSearchLoading, searchLoading }) => {
  const [products, setProducts] = useState([]);
  const [deleteProductID, setDeleteProductID] = useState(null);
  const { token, fetchAgain, API_BASE_URL } = AdminState();
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const toast = useToast();
  const [loadingMore, setLoadingMore] = useState(false); // Track if more data is being loaded
  const [page, setPage] = useState(1); // Initial page number
  const pageSize = 10; // Number of products to load per page

  // Function to load more products
  const loadMoreProducts = async () => {
    if (loadingMore) return; // Prevent multiple simultaneous requests
    setLoadingMore(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page + 1, // Load the next page
          limit: pageSize, // Specify the number of products to load per page
        },
      });
      // Append the new products to the existing list
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage((prevPage) => prevPage + 1);

      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching more products:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error while fetching products"
      );

      setLoadingMore(false);
    }
  };

  // Scroll listener to trigger loading more data when reaching the bottom
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // When the user is near the bottom of the page, load more data
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (product.category &&
          product.category.name.toLowerCase().includes(lowerCaseSearchTerm))
    );

    setFilteredProducts(results);
    setSearchLoading(false); // You can set loading to false here
  }, [searchTerm, products]);

  useEffect(() => {
    loadMoreProducts();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchAgain]);

  const handleDeleteProduct = async (productID, product) => {
    //  the logic to handle deleting a product from the database
    console.log("Deleting product:", productID);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/products/delete`,
        { data: { productId: productID } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response:", response);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productID)
      );
      toast({
        title: "Deleted",
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

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setTimeout(() => {
      setSearchLoading(false);
    }, 1000);
  }, [searchTerm]);

  const ThArr = ["Image", "Name", "Category", "SubCategory", "Actions"];
  return (
    <>
      {loadingMore ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Spinner />
        </Box>
      ) : (
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
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th>Subcategory</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredProducts?.map((product) => (
                            <Tr fontSize={"x-small"} key={product.id}>
                              {/* <Td>
                                <Image
                                  width={"12"}
                                  maxH={12}
                                  src={product.images[0]}
                                />
                              </Td> */}
                              <Td fontWeight="bold">{product.name}</Td>
                              <Td>
                                {product.category?.name ||
                                  product.category ||
                                  "-"}
                              </Td>
                              <Td>
                                {product.subcategory?.name ||
                                  product.subcategory ||
                                  "-"}
                              </Td>
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
                                          setDeleteProductID(product._id);
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
      )}
    </>
  );
};

export default ProductGrid;
