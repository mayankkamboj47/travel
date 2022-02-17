/* eslint-disable react/no-unstable-nested-components */
import { useParams, useSearchParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import axios from 'axios';
import Filterable from './Filterable';
import { DetailsCard } from './Card';

export default function Search() {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  return (
    <Container maxW={1600} margin="0 auto">
      <Filterable
        dataSource={`http://localhost:3001/hotel/search/${query}`}
        map={({
          amenities, title, subtitle, rating, reviews, images, price, _id,
        }) => (
          <DetailsCard
            image={images[0]}
            title={title}
            caption={subtitle}
            rating={rating}
            reviews={reviews}
            price={price}
            amenities={amenities}
            key={_id}
            link={`/hotel/${_id}`}
            heartAction={() => axios.get(`http://localhost:3001/user/wishlist/add?hotel=${_id}`, { withCredentials: true }).then(() => alert('Added to wishlist'))}
          />
        )}
        additionalFilters={searchParams.get('location') ? { location: searchParams.get('location') } : {}}
      />
    </Container>
  );
}
