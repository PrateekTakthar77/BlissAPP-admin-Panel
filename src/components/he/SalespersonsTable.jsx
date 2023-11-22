import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  FormControl,
  theme,
  Alert,
  AlertIcon,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AdminState } from "../context/context";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function SalespersonsTable({ searchTerm, setSearchTerm }) {
  const [salespersons, setSalespersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateMe = useNavigate();
  const { API_BASE_URL, API_LOCAL_URL } = AdminState();

  useEffect(() => {
    // Fetch salespersons data from the API
    axios
      .get(`${API_BASE_URL}/api/admin/all-salespersons`)
      .then((response) => {
        setSalespersons(response.data.salespersons.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch salespersons data");
        setLoading(false);
      });
  }, []);

  const filteredSalespersons = salespersons.filter((salesperson) => {
    return (
      salesperson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesperson.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleUpdate = (salespersonId) => {
    // Handle update logic here
    console.log("Updating salesperson:", salespersonId);
    navigateMe(`/salesperson/update/${salespersonId}`);
  };

  const handleDelete = (salespersonId) => {
    // Handle delete logic here
    console.log("Deleting salesperson:", salespersonId);
  };

  return (
    <>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error" my={4}>
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              {/* <Th>Address</Th> */}
              {/* <Th>City</Th> */}
              {/* <Th isNumeric>Commission</Th>
              <Th>Dealer</Th> */}

              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSalespersons.map((salesperson) => (
              <Tr key={salesperson._id} fontSize={"small"}>
                <Td>{salesperson.code}</Td>
                <Td>{salesperson.name}</Td>
                <Td>{salesperson.email}</Td>
                <Td>{salesperson.phone}</Td>
                {/* <Td>{salesperson.address || "-"}</Td> */}
                {/* <Td>{salesperson.city || "-"}</Td> */}
                {/* <Td fontSize={"x-small"} pl={12}>
                  {salesperson.commission || 0}
                </Td> */}
                {/* <Td>{salesperson.dealer?.name}</Td> */}
                <Td>
                  <HStack>
                    <IconButton
                      colorScheme="blue"
                      aria-label="View"
                      size="sm"
                      onClick={() =>
                        navigateMe(`/salesperson/${salesperson._id}`)
                      }
                      icon={<BsEye />}
                    />

                    <IconButton
                      colorScheme="yellow"
                      aria-label="Edit"
                      size="sm"
                      onClick={() => handleUpdate(salesperson._id)}
                      icon={<BiEdit />}
                    />
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete"
                      size="sm"
                      onClick={() => handleDelete(salesperson._id)}
                      icon={<MdDelete />}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}

export default SalespersonsTable;
