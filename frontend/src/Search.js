/* eslint-disable react/no-unstable-nested-components */
import { useParams, useSearchParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Filterable from './Filterable';
import { cards } from './Card';

export default function Search() {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  return (
    <Container maxW={1600} margin="0 auto">
      <Filterable
        dataSource={`http://localhost:3001/hotel/search/${query}`}
        map={cards}
        additionalFilters={searchParams.get('location') ? { location: searchParams.get('location') } : {}}
      />
    </Container>
  );
}
