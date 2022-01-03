/* eslint-disable react/no-unescaped-entities */
import {
  Box, Button, Heading, Text,
} from '@chakra-ui/react';

export default function Hero() {
  return (
    <Box
      textAlign="center"
      py="10rem"
      background="url(https://static-wix-blog.wix.com/photography/2017/04/13131389_986110254757703_1395206472781164079_o.jpg)"
      backgroundSize="cover"
      maxH="100vh"
    >
      <Heading mb="1rem" color="white">
        Not sure where to go ? Perfect.
      </Heading>
      <Button borderRadius="1.5rem" colorScheme="gray">
        <Text bgGradient="linear-gradient(0deg, #ff253a, purple)" backgroundClip="text">
          I'm Flexible
        </Text>
      </Button>
    </Box>
  );
}
