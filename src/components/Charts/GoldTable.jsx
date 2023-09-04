import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { AdminState } from "../context/context";
import axios from "axios";

const CreateTableTab = ({ onSubmit }) => {
  const [coinType, setCoinType] = useState("gold");
  const [gramPrice, setGramPrice] = useState("");
  const [makingCharges, setMakingCharges] = useState("");
  const [gstPercentage, setGstPercentage] = useState("3");
  const [status, setStatus] = useState("");
  const handleCoinTypeChange = (event) => {
    setCoinType(event.target.value);
  };

  const handleGramPriceChange = (event) => {
    setGramPrice(event.target.value);
  };

  const handleMakingChargesChange = (event) => {
    setMakingCharges(event.target.value);
  };

  const handleGstPercentageChange = (event) => {
    setGstPercentage(event.target.value);
  };
  const handleStatusRadioChang = (event) => {
    // console.log("event.target.value: ", event.target.value);
    setStatus(event.target.value);
  };
  const handleSubmit = (event) => {
    {
      // console.log("status: ", status);
    }
    event.preventDefault();
    onSubmit({
      coinType,
      gramPrice,
      makingCharges,
      gstPercentage,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl m={2}>
        <FormLabel>Coin Type:</FormLabel>
        <Select value={coinType} onChange={handleCoinTypeChange}>
          <option value="gold">Gold Coins</option>
          <option value="silver">Silver Coins</option>
        </Select>
      </FormControl>

      <FormControl m={2}>
        <FormLabel>Weight</FormLabel>
        <Input
          type="number"
          value={gramPrice}
          onChange={handleGramPriceChange}
          placeholder="Enter Weight"
        />
      </FormControl>

      <FormControl m={2}>
        <FormLabel>Making Charges (%)</FormLabel>
        <Input
          type="number"
          value={makingCharges}
          onChange={handleMakingChargesChange}
          placeholder="Enter Making Charges (%)"
        />
      </FormControl>
      <FormControl m={2}>
        <FormLabel>Status</FormLabel>
        <RadioGroup defaultValue="true">
          <Stack spacing={5} direction="row">
            <Radio
              onChange={handleStatusRadioChang}
              colorScheme="green"
              value={"true"}
            >
              Active
            </Radio>
            <Radio
              onChange={handleStatusRadioChang}
              colorScheme="red"
              value={"false"}
            >
              Inactive
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {/* <FormControl>
        <FormLabel>GST (%):</FormLabel>
        <Input
          type="number"
          value={gstPercentage}
          onChange={handleGstPercentageChange}
          placeholder="Enter GST (%)"
        />
      </FormControl> */}
      {/* second Form */}
      <Button
        m={4}
        colorScheme="blue"
        type="submit"
        isDisabled={!coinType || !gramPrice || !makingCharges || !gstPercentage}
      >
        Submit
      </Button>
    </form>
  );
};
const CreateTableTab2 = ({ onSubmit }) => {
  const [coinType, setCoinType] = useState("gold");
  const [gramPrice, setGramPrice] = useState("");
  const [makingCharges, setMakingCharges] = useState("");
  const [gstPercentage, setGstPercentage] = useState("3");
  const [status, setStatus] = useState("");
  const handleCoinTypeChange = (event) => {
    setCoinType(event.target.value);
  };

  const handleGramPriceChange = (event) => {
    setGramPrice(event.target.value);
  };

  const handleMakingChargesChange = (event) => {
    setMakingCharges(event.target.value);
  };

  const handleGstPercentageChange = (event) => {
    setGstPercentage(event.target.value);
  };
  const handleStatusRadioChang = (event) => {
    // console.log("event.target.value: ", event.target.value);
    setStatus(event.target.value);
  };
  const handleSubmit = (event) => {
    {
      // console.log("status: ", status);
    }
    event.preventDefault();
    onSubmit({
      coinType,
      gramPrice,
      makingCharges,
      gstPercentage,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl m={2}>
        <FormLabel>Coin Type:</FormLabel>
        <Select value={coinType} onChange={handleCoinTypeChange}>
          <option value="gold">Gold Coins</option>
          <option value="silver">Silver Coins</option>
        </Select>
      </FormControl>

      <FormControl m={2}>
        <FormLabel>Enter 1 Gram Price</FormLabel>
        <Input
          type="number"
          value={gramPrice}
          onChange={handleGramPriceChange}
          placeholder="Enter 1 Gram Price"
        />
      </FormControl>
      {/* First form */}
      <Button
        m={4}
        colorScheme="blue"
        type="submit"
        isDisabled={!coinType || !gramPrice}
      >
        Submit
      </Button>
    </form>
  );
};

// table displaying Gold data
const GoldTableTab = ({ data, gstPercentage, makingCharges, status }) => {
  // console.log(data);
  return (
    <>
      {data.length > 0 ? (
        <Table variant="striped" colorScheme="gray" mt={4}>
          <Thead>
            <Tr>
              <Th>Weight</Th>
              <Th>Gold Price</Th>
              <Th>Making</Th>

              <Th>GST</Th>
              <Th>Net Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((item) => (
                <Tr key={item.id}>
                  {/* {console.log("item: ", item)} */}
                  <Td>{item.weight + "g"}</Td>
                  <Td>{"₹" + item.goldPrice.goldPrice}</Td>
                  <Td>{makingCharges + "%"}</Td>

                  <Td>{gstPercentage + "%"}</Td>
                  <Td>{"₹" + item.goldPrice.netAmount}</Td>
                  <Td>{status === "true" ? "Inactive ❌" : "Active 🟢"}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <H1>Hello</H1>
      )}
    </>
  );
};

const SilverTableTab = ({ data, gstPercentage, makingCharges, status }) => {
  return (
    <Table variant="striped" colorScheme="gray" mt={4}>
      <Thead>
        <Tr>
          <Th>Weight</Th>
          <Th>Silver Price</Th>
          <Th>Making</Th>
          {/* <Th>Status</Th> */}
          <Th>GST</Th>
          <Th>Net Amount</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 &&
          data.map((item) => (
            <Tr key={item.id}>
              {/* {console.log("item: ", item)} */}
              <Td>{item.weight + "g"}</Td>
              <Td>{"₹" + item.silverPrice.goldPrice}</Td>
              <Td>{makingCharges + "%"}</Td>
              {/* <Td>Active 🟢</Td> */}
              <Td>{gstPercentage + "%"}</Td>
              <Td>{"₹" + item.silverPrice.netAmount}</Td>
              {/* {console.log("status: ", status)} */}
              <Td>{status === "true" ? "Active 🟢" : "Inactive ❌"}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

const GoldPriceCalculator = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [formDataOuter, setFormDataOuter] = useState({});
  const [coinPrice, setCoinPrice] = useState({});
  const [gramPrice, setGramPrice] = useState({});
  const { API_LOCAL_URL } = AdminState();
  // console.log(`coinPrice-------------------------------`, coinPrice);
  // console.log(`gramPrice+++++++++++++++++++++++++++++`, gramPrice);

  useEffect(() => {
    const getLastCoinPrice = async () => {
      try {
        const response = await axios.get(
          `${API_LOCAL_URL}/api/admin/last-coin-price`
        );
        setCoinPrice(response.data.coinPrice);
        setFormDataOuter((prev) => {
          return {
            ...prev,
            weights: [...response.data.coinPrice.weights],
          };
        });
        console.log("response.data.coinPrice: ", response.data);
      } catch (error) {
        console.error("Failed to retrieve last coin price:", error);
      }
    };

    getLastCoinPrice();
  }, []);

  useEffect(() => {
    const getLastGramPrice = async () => {
      try {
        const response = await axios.get(
          `${API_LOCAL_URL}/api/admin/last-gram-price`
        );
        setGramPrice(response.data.gramPrice);
        setFormDataOuter((prev) => {
          return {
            ...prev,
            gramPrice: Number(response.data.gramPrice.price),
            coinType: response.data.gramPrice.type,
          };
        });
        console.log("response.data.gramPrice: ", response.data);
      } catch (error) {
        console.error("Failed to retrieve last gram price:", error);
      }
    };

    getLastGramPrice();
  }, []);

  const handleCreateTableSubmit = (formData) => {
    setFormDataOuter((prev) => {
      return {
        ...formDataOuter,
        makingCharges: formData.makingCharges,
        gstPercentage: formData.gstPercentage,
      };
    });
    // console.log("formDataOuter", formDataOuter);
    const { coinType, gramPrice } = formDataOuter;
    const { makingCharges, gstPercentage, status } = formData;
    // console.log("coinType: ", formDataOuter);

    const calculateNetAmount = (weight, price, charges, gst) => {
      const goldPrice = parseFloat(price) * weight;
      const making = goldPrice * (parseFloat(charges) / 100);
      const gstAmount = goldPrice * (parseFloat(gst) / 100);
      const netAmount = goldPrice + making + gstAmount;
      // console.log("netAmount: ", netAmount);

      return {
        goldPrice: goldPrice.toFixed(2),
        making: making.toFixed(2),
        gst: gstAmount.toFixed(2),
        netAmount: netAmount.toFixed(2),
      };
    };

    const generateTableData = (coinPriceName) => {
      // console.log("afadsfsdfdsfdf: ", formDataOuter);
      const weights = formDataOuter.weights.map((item) => {
        return item.weight;
      });
      // console.log("weight: ", weights);
      const data = weights.map((weight, index) => ({
        id: index + 1,
        weight: weight.toString(),
        [coinPriceName]: calculateNetAmount(
          weight,
          gramPrice,
          makingCharges,
          gstPercentage
        ),
      }));

      return data;
    };

    let newData;
    if (coinType === "gold") {
      newData = generateTableData("goldPrice");
    } else if (coinType === "silver") {
      newData = generateTableData("silverPrice");
    }

    setTableData(newData);
    setActiveTab(coinType === "gold" ? 1 : 2);
  };

  return (
    <Container maxW="100%">
      <Box bg="white" p={6} rounded="lg" shadow="md">
        <Tabs isFitted index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Add Price</Tab>
            <Tab>Add Coins</Tab>
            <Tab>Gold Coin Price</Tab>
            <Tab>Silver Coin Price</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CreateTableTab2 onSubmit={handleCreateTableSubmit} />
            </TabPanel>
            <TabPanel>
              <CreateTableTab onSubmit={handleCreateTableSubmit} />
            </TabPanel>

            {tableData.length > 0 && (
              <TabPanel>
                {tableData[0].goldPrice ? (
                  <GoldTableTab
                    data={tableData}
                    makingCharges={formDataOuter.makingCharges}
                    gstPercentage={formDataOuter.gstPercentage}
                    status={formDataOuter.status}
                  />
                ) : (
                  <>No data</>
                )}
              </TabPanel>
            )}
            {tableData.length > 0 && (
              <TabPanel>
                {tableData[0].silverPrice ? (
                  <SilverTableTab
                    makingCharges={formDataOuter.makingCharges}
                    gstPercentage={formDataOuter.gstPercentage}
                    status={formDataOuter.status}
                    data={tableData}
                  />
                ) : (
                  <>No data</>
                )}
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default GoldPriceCalculator;
