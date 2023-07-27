import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image,
  HStack,
} from "@chakra-ui/react";
import LoginNav from "./LoginNav";
import { useNavigate } from "react-router-dom";
import { AdminState } from "../../components/context/context";
import { BeatLoader } from "react-spinners";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigateTo = useNavigate();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_BASE_URL);
    setLoading(true);
    console.log("email:", email, "password:", password);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin/login`,
        { email, password }
      );
      const { token, User } = response.data;

      // Store token in local storage
      localStorage.setItem("token", JSON.stringify(token));
      // Store token in local storage
      localStorage.setItem("User", JSON.stringify(User));
      // fetch in adminstate
      setUserAgain((prev) => !prev);
      toast({
        title: "Login Successful.",
        description:
          "Info: " + response.data.message + " Account loggedIn successfully.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      // Redirect or perform upon successful login
      setLoggedIn((prev) => true);
      setLoading(false);
      navigateTo("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login failed.",
        description:
          "Error: " +
          error.response.data.message +
          "!" +
          " Please check your credentials and try again. ",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <>
      <LoginNav />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        //   bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} mt={-24} px={6}>
          <Stack align={"center"}>
            {/* <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            <Link color={"blue.400"}>Management</Link> ✌️
          </Text> */}
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack> */}
                <Button
                  bg={"gray.800"}
                  color={"#f4ca46"}
                  _hover={{
                    color: "gray.800",
                    bg: "#f4ca46",
                  }}
                  onClick={handleLogin}
                  isLoading={loading}
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
