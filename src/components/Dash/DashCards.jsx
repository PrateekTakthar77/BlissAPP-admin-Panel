import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer, FiUserPlus } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCartArrowDown, FaListOl, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function StatsCard(props) {
  const { title, stat, icon } = props;
  const navigateMe = useNavigate();
  return (
    <Stat
      cursor="pointer" // Set cursor to pointer on hover
      onClick={() => navigateMe(props.link)}
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({
  totalProducts,
  totalOrders,
  totalUsers,
  totalRevenue,
  totalBookings,
  setCustomOrders,
  // setPremium,
}) {
  return (
    <Box maxW="7xl" mt={-8}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"lg"}
        color={"yellow.400"}
        py={10}
        fontWeight={"bold"}
      ></chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          cursor="pointer" // Set cursor to pointer on hover
          title={"Total Registered Dealers"}
          link={"/dealers"}
          stat={totalUsers}
          icon={<FiUserPlus size={"3em"} />}
        />
        <StatsCard
          title={"Total Products"}
          link={"/products"}
          stat={totalProducts}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Total Orders"}
          link={"/orders"}
          stat={totalOrders}
          icon={<FaCartArrowDown size={"3em"} />}
        />
        <StatsCard
          title={"Total Revenue"}
          link={"/orders"}
          stat={"₹" + totalRevenue}
          icon={<FaDollarSign size={"3em"} />}
        />
        <StatsCard
          title={"Appointment Bookings"}
          link={"/bookings"}
          stat={totalBookings} // Display the totalBookings prop
          icon={<FaListOl size={"3em"} />}
        />
        <StatsCard
          title={"Total Custom Orders"}
          link={"/customorders"}
          stat={setCustomOrders} // Display the totalBookings prop
          icon={<TbTruckDelivery size={"3em"} />}
        />
        {/* <StatsCard
          title={"Premium Charges"}
          // stat={setPremium} // Display the totalBookings prop
          icon={<TbTruckDelivery size={"3em"} />}
        /> */}
      </SimpleGrid>
    </Box>
  );
}
