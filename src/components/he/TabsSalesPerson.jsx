import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import RegisterForm from "../he/SalespersonRegister";
import SalespersonsTable from "./SalespersonsTable";

const TabsSalesPerson = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchLoading(true);
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <HStack overflow="hidden">
        <Tabs
          width="100vw"
          mt={-4}
          defaultIndex={location.pathname !== "/products" ? 0 : 1}
        >
          <TabList display="flex" justifyContent="space-around">
            <HStack>
              <Tab>All Salesperson</Tab>
              <Tab>
                <Button>Create Salesperson ➕</Button>
              </Tab>
            </HStack>
            <Box maxWidth="100%" mb={4}>
              <Box maxWidth="100%" mt={4}>
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  maxWidth="300px"
                />
              </Box>
            </Box>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={4}>
                <SalespersonsTable
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  );
};

export default TabsSalesPerson;
