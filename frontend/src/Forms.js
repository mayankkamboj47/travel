import
{
  Input, Flex, Heading, Link as ChakraLink, Button, IconButton, InputGroup, InputRightElement,
}
  from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form>
      <Flex direction="column" alignItems="center" p="3rem 0">
        <Heading mb={5}>Login</Heading>
        <Input
          placeholder="Username"
          maxWidth="20rem"
          mb={2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button width="100%" maxWidth="20rem" m={5} type="submit">Login</Button>
        <Heading size="md">Login Using</Heading>
        <OAuthButtons />
        <Link to="/signup">
          <ChakraLink>Create an Acccount</ChakraLink>
        </Link>
      </Flex>
    </form>
  );
}

export function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form>
      <Flex direction="column" alignItems="center" p="3rem 0">
        <Heading mb={5}>Sign Up</Heading>
        <Input
          placeholder="Pick a username"
          maxWidth="20rem"
          mb={2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput placeholder="Pick a password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button width="100%" maxWidth="20rem" m={5} type="submit">Create an Account</Button>
        <Heading size="md">Sign up using</Heading>
        <OAuthButtons />
        <Link to="/login">
          <ChakraLink>Already have an account ? Log in.</ChakraLink>
        </Link>
      </Flex>
    </form>
  );
}
function OAuthButtons() {
  return (
    <Flex style={{ gap: '1rem' }} my={3}>
      <IconButton icon={<FontAwesomeIcon icon={faGoogle} />} />
      <IconButton icon={<FontAwesomeIcon icon={faFacebook} />} />
    </Flex>
  );
}

function PasswordInput({ placeholder, value, onChange }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup maxWidth="20rem">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
