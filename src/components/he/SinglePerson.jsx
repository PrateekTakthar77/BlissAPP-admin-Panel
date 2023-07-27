import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useToast,
  Grid,
  GridItem,
  Heading,
  Text,
  Spinner,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import DealerMap from "./DealerMap";

function SinglePerson() {
  const { API_LOCAL_URL, token } = AdminState();
  const { personId } = useParams();
  const [salesperson, setSalesperson] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigateTo = useNavigate();
  const toast = useToast();

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

  const handleBack = () => {
    navigateTo("/salesperson");
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      {!loading ? (
        <Box mx="auto" p={8} bg="white" borderRadius="md" boxShadow="lg">
          <Button onClick={handleBack} mb={4}>
            Go Back
          </Button>
          <hr
            style={{
              margin: "1rem 0",
              width: "100%",
              height: "3px",
            }}
          />
          <Heading fontSize="xl" fontWeight="bold" mb={6} textAlign="center">
            Salesperson Details
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Name:</Text>
              <Text>{salesperson.name}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Email:</Text>
              <Text>{salesperson.email}</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">Phone:</Text>
              <Text>{salesperson.phone}</Text>
            </GridItem>

            <GridItem>
              <Text fontWeight="bold">Address:</Text>
              <Text>{salesperson.address}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">City:</Text>
              <Text>{salesperson.city}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">State:</Text>
              <Text>{salesperson.state}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Aadhar Card No:</Text>
              <Text>{salesperson.aadharCardNo}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Aadhar Card Image:</Text>
              <Image
                width={12}
                src={
                  salesperson.aadharCardImage ||
                  "https://imgpile.com/images/Cu465E.jpg"
                }
                alt="aadharCardImage"
                onClick={() =>
                  openImageModal(
                    salesperson.aadharCardImage ||
                      "https://imgpile.com/images/Cu465E.jpg"
                  )
                }
                cursor="pointer"
              />
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Pan Card No:</Text>
              <Text>{salesperson.panCardNo}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Pan Card Image:</Text>
              <Image
                width={12}
                src={
                  salesperson.panCardImage ||
                  "https://imgpile.com/images/Cu465E.jpg"
                }
                alt="panCardImage"
                onClick={() =>
                  openImageModal(
                    salesperson.panCardImage ||
                      "https://imgpile.com/images/Cu465E.jpg"
                  )
                }
                cursor="pointer"
              />
            </GridItem>
            <GridItem>
              <Text fontWeight="bold"> Dealers List:</Text>
              <DealerMap />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          mx="auto"
          maxW="100%"
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      )}

      <Modal isOpen={isImageModalOpen} onClose={closeImageModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage} alt="Modal Image" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SinglePerson;
