/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
import {
  Heading, Flex, Box, Text, Tag, Button, Input, Select, Spinner,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, FormControl, FormLabel, Textarea, useDisclosure,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import useRemote from './hooks';

export default function HotelPage() {
  const { id } = useParams();
  const [data, loading, error] = useRemote(`http://localhost:3001/hotel/${id}`);
  if (loading) return <Spinner />;
  if (error) return <p>Page could not be loaded</p>;
  const {
    title, rating, reviews, location, images, description, price, reviewData,
  } = data;
  function reserveHotel() {
    axios.get(`http://localhost:3001/hotel/${id}/book`, { withCredentials: true }).then(() => {
      alert('Thank you for booking');
    });
  }
  return (
    <Box maxW="1600px" m="0 auto" padding="0 2rem">
      <Heading>{title}</Heading>
      <RatingReviewsAndLocation location={location} rating={rating.toPrecision(2)} />
      <ImagesHero images={images} />
      <Booker rating={rating} price={price} numreviews={reviews} onBook={reserveHotel} />
      <Description description={description} />
      <Reviews
        numreviews={reviews}
        rating={rating.toPrecision(2)}
        id={id}
        reviewData={reviewData}
      />
    </Box>
  );
}
/*
{"rooms": {"guests": 16.0, "bedrooms": 5.0, "beds": 5.0, "bathrooms": 6.5},
 "amenities": ["Wifi", "Kitchen", "Free parking"],
 "title": "CasaMo, Silver Oak",
 "rating": 4.67,
 "reviews" :  6,
 "images": ["https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/55c6dc97-3d6e-43b8-af2c-5a3501efc8cc.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/5e9616c4-c6cf-4433-89bc-d5f213324320.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/653db8f7-8884-4369-b700-f4334c272166.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/75903290-e051-4d5b-bce2-b6818fd7dedf.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/9f7a0843-f3a2-4cdc-86da-2593c9644373.jpeg?im_w=720"],
 "price": "\u20b935,200",
 "description" : "This is the best hotel there is period"
 "location" : "Mahabaleshwar, Maharashtra, India"
}
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

function Reviews({
  numreviews, rating, id, reviewData,
}) {
  const [reviews, setReviews] = useState(reviewData);
  return (
    <div>
      <ReviewModal _id={id} addReview={(x) => setReviews(reviews.concat(x))} />
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
      {reviews.map(({ name, text, verified }) => (
        <Box mt="1rem" w="fit-content" border="1px solid grey" borderRadius="1rem" p="0.5rem 1rem 1rem 1rem">
          <Heading size="md">
            {name}
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

function Booker({
  rating, price, numreviews, onBook,
}) {
  return (
    <Box float="right" padding="1rem" bgColor="gray.100" mt="2rem" minW="400px" borderRadius="1rem">
      <Flex justifyContent="space-between" mb="1rem" alignItems="center">
        <div>
          <Text fontSize="1.5rem">
            ₹
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
        <Flex>
          <label htmlFor="checkin" w="50%">
            Check-in Date
            <Input variant="filled" w="100%" placeholder="Check-in Date" type="date" name="checkin" />
          </label>
          <label htmlFor="checkout" w="50%">
            Check-out Date
            <Input variant="filled" w="100%" placeholder="Check-out Date" type="date" name="checkout" />
          </label>
        </Flex>
        <Select variant="filled">
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
          <option>5 Guests</option>
          <option>6 Guests</option>
        </Select>
      </div>
      <Button w="100%" mt="0.5rem" bgColor="#97c7ae" onClick={onBook}>Reserve</Button>
    </Box>
  );
}

function ReviewModal({ _id, addReview }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  return (
    <React.Fragment>
      <Button onClick={onOpen} mb={5}>Leave a review</Button>
      <Modal
        initialFocus
        finalFocus
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave a review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumInput max={5} min={1} onChange={setRating} value={rating} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Textarea placeholder="" onChange={(e) => setText(e.target.value)} value={text} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => postReview()}>
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
  async function postReview() { // this will be changed
    // Also, awkward. Don't do this, look at the poor glue between postReview and
    // hotelPage
    try {
      const response = await axios.get(`http://localhost:3001/hotel/${_id}/review`, {
        withCredentials: true,
        params: {
          rating,
          text,
        },
      });
      addReview(response.data);
    } catch (e) {
      alert('You\'re not logged in');
    }
    onClose();
  }
}

function NumInput(props) {
  return (
    <NumberInput width="5rem" min={1} aria-label="Quantity" defaultValue={1} {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
