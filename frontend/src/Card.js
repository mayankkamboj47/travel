import {
  Heading, Flex, Text, Image, Box, IconButton,
} from '@chakra-ui/react';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import useRemote from './hooks';

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
  image, title, caption, rating, reviews, price, amenities, link, heartAction,
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
    <Flex w="100%" maxW="55rem" gap="1rem" style={{ lineHeight: 1.8 }} py="1rem">
      <Image src={image} flex={4} w="15rem" h="12rem" objectFit="cover" />
      <Box flex={5} position="relative">
        <Text fontSize="sm" color="gray.500">{caption}</Text>
        <Link to={link}><Heading size="md" maxW="20rem">{title}</Heading></Link>
        {amenities.map(
          // eslint-disable-next-line comma-dangle
          (amenity) => <Text as="span" mr="1rem" wordBreak="keep-all" fontSize="sm" color="gray.500" key={amenity}>{amenity}</Text>
        )}
        <Text style={ratingBoxStyle}>
          <FontAwesomeIcon icon={faStar} />
          {' '}
          {rating.toPrecision(2) || 'No rating'}
          {' '}
          (
          {reviews || 'No'}
          {' '}
          Reviews)
        </Text>
        <Text style={priceBoxStyle}>
          <strong>{`₹${price} `}</strong>
          /night
        </Text>
        <IconButton
          icon={<FontAwesomeIcon icon={faHeart} />}
          style={heartStyle}
          onClick={() => heartAction()}
        />
      </Box>
    </Flex>
  );
}

export function Cards() { // REMOVE THIS !
  const [data, loading, error] = useRemote('http://localhost:3001/hotel');
  if (loading) return <p>Cards are loading...</p>;
  if (error) return <p>Some error fetching cards from backend</p>;
  return (
    <>
      {data.map(({
        title, subtitle, rating, reviews, images, amenities, price, _id,
      }) => (
        <DetailsCard
          image={images[0]}
          title={title}
          caption={subtitle}
          rating={rating}
          reviews={reviews}
          price={price}
          amenities={amenities}
          link={`/hotel/${_id}`}
          heartAction={() => axios.get(`http://localhost:3001/user/wishlist/add?hotel=${_id}`, { withCredentials: true })}
        />
      ))}
    </>
  );
}
