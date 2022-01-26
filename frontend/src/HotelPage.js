/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
import { Heading, Flex } from '@chakra-ui/react';
import React from 'react';

export default function HotelPage({
  title, rating, reviews, location, images, description,
}) {
  return (
    <React.Fragment>
      <Heading>{title}</Heading>
      <RatingReviewsAndLocation rating={rating} reviews={reviews} location={location} />
      <ImagesHero images={images} />
      <Flex>
        <Description description={description} />
        <Booker />
      </Flex>
      <Reviews numreviews={reviews} rating={rating} />
    </React.Fragment>
  );
}

function RatingReviewsAndLocation({ rating, reviews, location }) {
  return (
    <Flex>
      <div>
        ★
        {' '}
        {rating}
      </div>
      <div>
        {reviews}
        {' '}
        reviews
      </div>
      <div>{location}</div>
    </Flex>
  );
}

function ImagesHero({ images }) {
  const containerStyle = {
    gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  };
  const mainImageStyle = {
    gridRow: '1/3',
    gridColumn: '1/2',
  };
  return (
    <div style={containerStyle}>
      <img style={mainImageStyle} src={images[0]} />
      {images.slice(1).map((img) => <img src={img} key={img} alt={img} />)}
    </div>
  );
}

function Description({ description }) {
  return (<p>{description}</p>);
}

function Reviews({ numreviews, rating }) {
  return (
    <div>
      <Flex>
        <Heading>
          {numreviews}
          {' '}
          Reviews
        </Heading>
        <Heading>
          ★
          {' '}
          {rating}
        </Heading>
      </Flex>
    </div>
  );
}

function Booker() {
  return (
    <div />
  );
}
