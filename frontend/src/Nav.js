import {
  Input, InputGroup, InputRightElement, Flex, Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  return (
    <Flex as="nav" alignItems="center" p="0.5rem 2rem" bgColor="black" justifyContent="space-between">
      <Box className="logo" color="white" p="0 1rem 0 0">Airbnb</Box>
      <InputGroup maxW="70rem">
        <Input
          variant="filled"
          placeholder="Search"
          borderRadius="1.5rem"
          bgColor="white!important"
        />
        <InputRightElement>
          <FontAwesomeIcon icon={faSearch} />
        </InputRightElement>
      </InputGroup>
      <Box p="0 0 0 1.5rem">
        <FontAwesomeIcon icon={faUser} color="white" size="lg" />
      </Box>
    </Flex>
  );
}
