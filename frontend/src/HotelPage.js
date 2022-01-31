/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
import {
  Heading, Flex, Box, Text, Tag, Button, Input, Select,
} from '@chakra-ui/react';
import React from 'react';

export default function HotelPage({
  title, rating, reviews, location, images, description,
}) {
  return (
    <Box maxW="1600px" m="0 auto" padding="0 2rem">
      <Heading>{title}</Heading>
      <RatingReviewsAndLocation location={location} rating={rating} />
      <ImagesHero images={images} />
      <Booker rating={rating} price="$90" numreviews={reviews} />
      <Description description={description} />
      <Reviews numreviews={reviews} rating={rating} />
    </Box>
  );
}
/* {"rooms": {"guests": 16.0, "bedrooms": 5.0, "beds": 5.0, "bathrooms": 6.5},
"amenities": ["Wifi", "Kitchen", "Free parking"],
 "title": "CasaMo, Silver Oak",
 "rating": 4.67,
 "reviews" :  6,
 "images": ["https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/55c6dc97-3d6e-43b8-af2c-5a3501efc8cc.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/5e9616c4-c6cf-4433-89bc-d5f213324320.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/653db8f7-8884-4369-b700-f4334c272166.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/75903290-e051-4d5b-bce2-b6818fd7dedf.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/9f7a0843-f3a2-4cdc-86da-2593c9644373.jpeg?im_w=720"],
 "price": "\u20b935,200",
 "description" : "This is the best hotel there is period"
 "location" : "Mahabaleshwar, Maharashtra, India"}
 */
function RatingReviewsAndLocation({ rating, location }) {
  return (
    <Flex style={{ gap: '1rem' }}>
      <div>
        {' '}
        {location}
      </div>
      ★
      <div>{rating}</div>
    </Flex>
  );
}

function ImagesHero({ images }) {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '0.25rem',
  };
  const mainImageStyle = {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 1,
    gridColumnEnd: 2,
    width: '100%',
    height: '100%',
  };
  return (
    <div style={containerStyle}>
      <img style={mainImageStyle} src={images[0]} />
      {images.slice(1).map((img) => <img src={img} key={img} alt={img} />)}
    </div>
  );
}

function Description({ description }) {
  return (<Text m="1rem 2rem 2rem 0rem">{description}</Text>);
}

function Reviews({ numreviews, rating }) {
  const reviewData = [{ user: 'Ashok', text: 'Great place!', verified: true }, { user: 'Kritin', text: 'excellent hospitality services', verified: false }];
  return (
    <div>
      <Button mb="1rem"> Write a review </Button>
      <Flex>
        <Heading mr="1rem" size="md">
          {numreviews}
          {' '}
          Reviews
        </Heading>
        <Heading size="md">
          ★
          {' '}
          {rating}
        </Heading>
      </Flex>
      {reviewData.map(({ user, text, verified }) => (
        <Box mt="1rem" w="fit-content" border="1px solid grey" borderRadius="1rem" p="0.5rem 1rem 1rem 1rem">
          <Heading size="md">
            {user}
            {' '}
            {verified ? <Tag variant="outline" ml="1rem">verified user</Tag> : ''}
          </Heading>
          <Text size="sm">
            {text}
          </Text>
        </Box>
      ))}
    </div>
  );
}

function Booker({ rating, price, numreviews }) {
  return (
    <Box float="right" padding="1rem" bgColor="gray.100" mt="2rem" minW="400px" borderRadius="1rem">
      <Flex justifyContent="space-between" mb="1rem" alignItems="center">
        <div>
          <Text fontSize="1.5rem">
            {price}
            /night
          </Text>
        </div>
        <div>
          ★
          {' '}
          {rating}
        </div>
        <div>
          {numreviews}
          {' '}
          reviews
        </div>
      </Flex>
      <div>
        <Input variant="filled" w="50%" placeholder="Check-in Date" />
        <Input variant="filled" w="50%" placeholder="Check-out Date" />
        <Select variant="filled">
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
          <option>5 Guests</option>
          <option>6 Guests</option>
        </Select>
      </div>
      <Button w="100%" mt="0.5rem" bgColor="#97c7ae">Reserve</Button>
    </Box>
  );
}
