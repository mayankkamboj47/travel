import {
  Heading, Flex, Text, Image, Box, IconButton,
} from '@chakra-ui/react';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function ImageCard({ image, title, subtitle }) {
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

export function DetailsCard({
  image, title, caption, rating, reviews, price, amenities,
}) {
  const priceBoxStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
  };
  const ratingBoxStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
  };
  const heartStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
  };
  return (
    <Flex w="100%" maxW="50rem" gap="1rem" style={{ lineHeight: 1.8 }} py="1rem">
      <Image src={image} flex={1} maxW="20rem" />
      <Box flex={1} position="relative">
        <Text fontSize="sm" color="gray.500">{caption}</Text>
        <Heading size="md">{title}</Heading>
        {amenities.map(
          // eslint-disable-next-line comma-dangle
          (amenity) => <Text as="span" mr="1rem" wordBreak="keep-all" fontSize="sm" color="gray.500">{amenity}</Text>
        )}
        <Text style={ratingBoxStyle}>
          <FontAwesomeIcon icon={faStar} />
          {' '}
          {rating}
          {' '}
          (
          {reviews}
          {' '}
          Reviews)
        </Text>
        <Text style={priceBoxStyle}>
          <strong>{price}</strong>
          /night
        </Text>
        <IconButton icon={<FontAwesomeIcon icon={faHeart} />} style={heartStyle} />
      </Box>
    </Flex>
  );
}
