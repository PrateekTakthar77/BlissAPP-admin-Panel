import React from "react";
import { Box, Skeleton, Thead } from "@chakra-ui/react";
import { Table, Tr, Th, Td, TheadComp } from "./Table";

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SiteTableSkeleton = ({ ThArr }) => {
  return (
    <Box minW={"70vw"}>
      <Table minW={"70vw"}>
        <thead>
          <Tr>
            {ThArr.length > 0 &&
              ThArr.map((header, index) => {
                return <Th key={index}>{header}</Th>;
              })}
          </Tr>
        </thead>
        <tbody>
          <SkeletonRow width="75px" />
          <SkeletonRow width="125px" />
          <SkeletonRow width="50px" />
          <SkeletonRow width="100px" />
          <SkeletonRow width="75px" />
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTableSkeleton;
