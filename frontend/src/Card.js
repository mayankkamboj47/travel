/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import {
  Heading, Flex, Text, Image, Box, IconButton,
} from '@chakra-ui/react';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { loadData, setData } from './utils';

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
  image, title, caption, rating, reviews, price, amenities, link, heartAction, hearted,
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
          (amenity) => <Text as="span" mr="1rem" wordBreak="keep-all" fontSize="sm" color="gray.500" key={amenity}>{amenity}</Text>,
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
          style={hearted ? { ...heartStyle, color: 'red' } : heartStyle}
          onClick={() => heartAction()}
        />
      </Box>
    </Flex>
  );
}

export function cards(data) {
  class MakeCards extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        wishlisted: [],
      };
    }

    componentDidMount() {
      loadData('http://localhost:3001/user/wishlist/id').then((data) => this.setState({ wishlisted: data }));
    }

    onHeart(_id) {
      if (this.state.wishlisted.indexOf(_id) > -1) {
        axios.get(`http://localhost:3001/user/wishlist/remove?hotel=${_id}`, { withCredentials: true }).then(
          () => {
            const newWishlist = this.state.wishlisted.filter((x) => x !== _id);
            this.setState({ wishlisted: newWishlist });
            setData('http://localhost:3001/user/wishlist/id', newWishlist);
          },
        );
      } else {
        const newWishlist = [...this.state.wishlisted, _id];
        axios.get(`http://localhost:3001/user/wishlist/add?hotel=${_id}`, { withCredentials: true }).then(() => {
          this.setState({ wishlisted: newWishlist });
          setData('http://localhost:3001/user/wishlist/id', newWishlist);
        });
      }
    }

    render() {
      return (
        <React.Fragment>
          {this.props.data.map(({
            title, subtitle, rating, reviews, images, amenities, price, _id,
          }) => (
            <DetailsCard
              key={_id}
              image={images[0]}
              title={title}
              caption={subtitle}
              rating={rating}
              reviews={reviews}
              price={price}
              hearted={this.state.wishlisted.indexOf(`${_id}`) > -1}
              amenities={amenities}
              link={`/hotel/${_id}`}
              heartAction={() => this.onHeart(`${_id}`)}
            />
          ))}
        </React.Fragment>
      );
    }
  }
  return <MakeCards data={data} />;
}
