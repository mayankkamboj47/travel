import {
  Input, InputGroup, InputRightElement, Flex, Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Nav() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const listenForEnter = (e) => {
    if (e.key === 'Enter') navigate(`/search/${searchText}`);
  };
  return (
    <Flex justifyContent="center" bgColor="black">
      <Flex as="nav" alignItems="center" p="0.5rem 2rem" justifyContent="space-between" flex="1" maxW="1600px">
        <Link to="/">
          <Box className="logo" color="white" p="0 2rem 0 0" fontWeight="bold" fontSize="1.3rem">Aashray</Box>
        </Link>
        <InputGroup maxW="70rem">
          <Input
            variant="filled"
            placeholder="Search"
            borderRadius="1.5rem"
            bgColor="white!important"
            onChange={onSearchChange}
            onKeyDown={listenForEnter}
            value={searchText}
          />
          <InputRightElement>
            <FontAwesomeIcon icon={faSearch} />
          </InputRightElement>
        </InputGroup>
        <Link to="/profile">
          <Box p="0 0 0 2rem">
            <FontAwesomeIcon icon={faUser} color="white" size="lg" />
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
}
