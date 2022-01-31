import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import React, {useState} from "react";
import { Link} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";

export function LoginForm(){
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');  
    return (
      <form>
        <Flex direction='column' alignItems='center' p='3rem 0'>
          <Heading mb={5}>Login</Heading>
          <Input
            placeholder='Username'
            maxWidth='20rem' mb={2}
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
          <PasswordInput placeholder='Password'
          value={password}
          onChange={e=>setPassword(e.target.value)}/> 
          <Button width='100%' maxWidth='20rem' m={5} type='submit'>Login</Button>
          <Heading size='md'>Login Using</Heading>
          <OAuthButtons />
          <Link to='/signup'>
            <ChakraLink>Create an Acccount</ChakraLink>
          </Link>
        </Flex>
      </form>
    );
}


export function SignUpForm(){
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    return (
      <form>
      <Flex direction='column' alignItems='center' p='3rem 0'>
        <Heading mb={5}>Sign Up</Heading>
        <Input
          placeholder='Pick a username'
          maxWidth='20rem' mb={2} value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <PasswordInput placeholder='Pick a password' value={password} onChange={(e)=>setPassword(e.target.value)}/> 
        <Button width='100%' maxWidth='20rem' m={5} type='submit'>Create an Account</Button>
        <Heading size='md'>Sign up using</Heading>
        <OAuthButtons />
        <Link to='/login'>
          <ChakraLink>Already have an account ? Log in.</ChakraLink>
        </Link>
      </Flex>
    </form>
    );
}
function OAuthButtons(){
    return (
      <Flex style={{gap:'1rem'}} my={3}>
        <IconButton icon={<FontAwesomeIcon icon={faGoogle} />} />
        <IconButton icon={<FontAwesomeIcon icon={faFacebook} />} />
      </Flex>
      );
  }
