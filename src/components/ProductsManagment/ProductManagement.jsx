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
import { Link, useLocation, useOutlet } from "react-router-dom";
import ProductGrid from "./FetchAndUpdate/ProductsGrid";
import MultiStepForm from "./AddProducts/MultiStepForm";
import { useState } from "react";

const ProjectManagement = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const outlet = useOutlet();

  const handleSearch = (event) => {
    setSearchLoading((prev) => true);
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <HStack overflow={"hidden"}>
        <Tabs
          width={"100vw"}
          mt={-4}
          defaultIndex={location.pathname !== "/products" ? 1 : 0}
        >
          <TabList display={"flex"} justifyContent={"space-around"}>
            <HStack>
              <Tab>
                <Link>All Products</Link>
              </Tab>
              <Tab>
                <Button>
                  <Link>Create Product ➕ </Link>
                </Button>
              </Tab>
            </HStack>
            <Box maxWidth={"100%"} mb={4}>
              <Box maxWidth={"100%"} mt={4}>
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
            <TabPanel minW={"100%"}>
              <ProductGrid
                searchTerm={searchTerm}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
              />
            </TabPanel>
            <TabPanel>
              <MultiStepForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  );
};

export default ProjectManagement;
