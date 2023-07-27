import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { token, API_BASE_URL } = AdminState();

  useEffect(() => {
    console.log("processssss", import.meta.env.VITE_APP_BASE_URL);
    const fetchNewUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          (prev) =>
            error.response.data.message ||
            error.response.data.error ||
            error.message ||
            "Error while fetching users"
        );
        setLoading(false);
      }
    };

    fetchNewUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      {error ? (
        <Box>{error}</Box>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Mobile</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"x-small"}>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.mobile}</Td>
                <Td>
                  {new Date(user.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default UserTable;
