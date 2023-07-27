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
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function StatsCard(props) {
  const { title, stat, icon } = props;
  const navigateMe = useNavigate();
  return (
    <Stat
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
          title={"Users"}
          link={"/dealers"}
          stat={totalUsers}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Products"}
          link={"/products"}
          stat={totalProducts}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Orders"}
          link={"/orders"}
          stat={totalOrders}
          icon={<FaCartArrowDown size={"3em"} />}
        />
        <StatsCard
          title={"Revenue"}
          stat={"₹" + totalRevenue}
          icon={<GrMoney size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
