/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-fragments */
import { Heading, Flex, Box, Text} from '@chakra-ui/react';
import React from 'react';

export default function HotelPage({
  title, rating, reviews, location, images, description,
}) {
  return (
    <Box maxW="1600px" m="0 auto" padding="0 2rem">
      <Heading>{title}</Heading>
      <RatingReviewsAndLocation location={location} rating={rating} />
      <ImagesHero images={images} />
      <Flex>
        <Description description={description} />
        <Booker />
      </Flex>
      <Reviews numreviews={reviews} rating={rating} />
    </Box>
  );
}
/*{"rooms": {"guests": 16.0, "bedrooms": 5.0, "beds": 5.0, "bathrooms": 6.5}, 
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
    <Flex style={{gap:'1rem'}}>
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
    gridColumnStart:1,
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
  return (
    <div>
      <Flex >
        <Heading mr="1rem" size="md" >
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
    </div>
  );
}

function Booker() {
  return (
    <div />
  );
}
