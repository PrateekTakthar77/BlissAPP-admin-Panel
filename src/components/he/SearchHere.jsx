import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";

const SearchHere = ({ searchTerm, handleSearch }) => {
  return (
    <FormControl maxW="sm" mx="auto" mb={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchHere;
