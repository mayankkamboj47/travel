import {
  Input, InputGroup, InputRightElement, Flex, Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  return (
    <Flex justifyContent="center" bgColor="black">
      <Flex as="nav" alignItems="center" p="0.5rem 2rem" justifyContent="space-between" flex="1" maxW="1600px">
        <Box className="logo" color="white" p="0 2rem 0 0">Airbnb</Box>
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
        <Box p="0 0 0 2rem">
          <FontAwesomeIcon icon={faUser} color="white" size="lg" />
        </Box>
      </Flex>
    </Flex>
  );
}
