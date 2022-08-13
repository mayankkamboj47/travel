/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import
{
  Input, Flex, Heading, Link as ChakraLink, Button, InputGroup, InputRightElement,
}
  from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from './globals';

function Form({ title, other, dataPromise }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <form>
      <Flex direction="column" alignItems="center" p="3rem 0">
        <Heading mb={5}>{title}</Heading>
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
        <Button width="100%" maxWidth="20rem" m={5} type="submit" onClick={submitForm}>{title}</Button>
        <Link to={other.link}>
          <ChakraLink>{other.text}</ChakraLink>
        </Link>
      </Flex>
    </form>
  );
  function submitForm(e) {
    e.preventDefault();
    dataPromise(username, password).then(
      () => navigate('/profile'),
    // eslint-disable-next-line newline-per-chained-call
    ).catch(
      (err) => console.error(err),
    );
  }
}

export function LoginForm() {
  const dataPromise = (username, password) => axios.post(
    `${server}/login`,
    { name: username, password },
    { withCredentials: true },
  ).then(() => axios.get(
    `${server}/user`,
    { withCredentials: true },
  )).catch(alert);

  return (
    <Form
      title="Login"
      other={{ link: '/signup', text: 'Create An Account' }}
      dataPromise={dataPromise}
    />
  );
}
export function SignUpForm() {
  const dataPromise = (username, password) => axios.post(`${server}/register`, { name: username, password }).then(
    () => axios.post(`${server}/login`, { name: username, password }, { withCredentials: true }),
  ).catch(alert);
  return (
    <Form
      title="Sign up"
      other={{ link: '/login', text: 'I already have an account' }}
      dataPromise={dataPromise}
    />
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
