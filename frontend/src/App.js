import {
  Container, Heading, Text, Flex, Spinner,
} from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import Nav from './Nav';
import { ImageCard, DetailsCard } from './Card';
import useRemote from './hooks';

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Container maxW={1600}>
        <Places />
        <About />
        <DetailsCard
          image="https://a0.muscache.com/pictures/4686147/5b0c1802_original.jpg"
          title="Amsterdam Apartment + Southgarden"
          caption="Entire home/apartment in Noord-Holland"
          rating={4.3}
          reviews={47}
          price="$49.0"
          amenities={['Refrigerator',
            'Piano',
            'Dishes and silverware',
            'Heating',
            'Hair dryer',
            'Body soap',
            'Wifi',
            'Shampoo']}
        />
        <DetailsCard
          image="https://a0.muscache.com/pictures/4686147/5b0c1802_original.jpg"
          title="Amsterdam Apartment + Southgarden"
          caption="Entire home/apartment in Noord-Holland"
          rating={4.3}
          reviews={47}
          price="$49.0"
          amenities={['Refrigerator',
            'Piano',
            'Dishes and silverware',
            'Heating',
            'Hair dryer',
            'Body soap',
            'Wifi',
            'Shampoo']}
        />

      </Container>
    </>
  );
}

export default App;

function Places() {
  const [data, loading, error] = useRemote('http://localhost:8080/places');
  if (loading) return <Spinner />;
  if (error) return <Heading>Something went wrong</Heading>;
  return (
    <>
      <Heading my="1rem">Places</Heading>
      <Flex style={{ gap: '1rem' }}>
        {
        data.map(
          ({ image, city, country }) => (
            <ImageCard
              image={image}
              title={city}
              subtitle={country}
            />
          ),
        )
      }
      </Flex>
    </>
  );
}

function About() {
  return (
    <>
      <Heading my="1rem">About</Heading>
      <Text>
        This website was created for Advanced Programming course at Ashoka University.
        Contact us at mayank.kamboj_ug23@ashoka.edu.in
      </Text>
    </>
  );
}
