/* eslint-disable react/no-unstable-nested-components */
import { useParams, useSearchParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Filterable from './Filterable';
import { cards } from './Card';
import { server } from './globals';

export default function Search() {
  const { query } = useParams();            // just the part after /search. Eg. delhi when doing /search/delhi
  const [searchParams] = useSearchParams();  // contains the stuff after `?` in the url - the query string
  return (
    <Container maxW={1600} margin="0 auto">
      <Filterable
        dataSource={`${server}/hotel/search/${query}`}
        map={cards}
        additionalFilters={searchParams.get('location') ? { location: searchParams.get('location') } : {}}
      />
    </Container>
  );
}
