/* eslint-disable react/no-unescaped-entities */
import {
  Box, Button, Heading, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <Box
      textAlign="center"
      py="10rem"
      background="linear-gradient(45deg, #af676778, #bb6629cf), url(https://www.flydubai.com/en/media/India_Hero_tcm8-33226.jpg)"
      backgroundSize="cover"
      backgroundPosition="bottom"
      maxH="100vh"
    >
      <Heading mb="1rem" color="white">
        Where will you go next ?
      </Heading>
      <Link to="/search/all">
        <Button borderRadius="1.5rem" colorScheme="gray">
          <Text bgGradient="linear-gradient(0deg, #ff253a, purple)" backgroundClip="text">
            Take me anywhere
          </Text>
        </Button>
      </Link>
    </Box>
  );
}
