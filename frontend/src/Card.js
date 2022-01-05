import { Heading, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function ImageCard({ image, title, subtitle }) {
  const styles = {
    color: 'white',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  };
  return (
    <Flex background={`url(${image})`} backgroundSize="cover" backgroundPosition="center" flexDirection="column" p="2rem" minH="300px" style={styles} minW="200px" justifyContent="end">
      <Heading>{title}</Heading>
      <Text>{subtitle}</Text>
    </Flex>
  );
}
