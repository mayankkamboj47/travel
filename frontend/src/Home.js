import {
  Container, Heading, Text, Flex, Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Hero from './Hero';
import { ImageCard } from './Card';
import useRemote from './hooks';
import FilterBar from './Filterbar';

function Home() {
  // Toggles. Rule : use false as the default state for toggles
  const [, setFeatured] = useState(false);
  const [, setKitchen] = useState(false);
  return (
    <>
      <FilterBar filterOptions={{
        toggles: { featured: setFeatured, kitchen: setKitchen },
        price: {
          min: 1,
          max: 100,
          currentMin: 4,
          currentMax: 92,
          onMinChange: console.log,
          onMaxChange: console.log,
        },
        date: {
          min: 1,
          max: 100,
          currentMin: 4,
          currentMax: 92,
          onMinChange: console.log,
          onMaxChange: console.log,
        },
      }}
      />
      <Hero />
      <Container maxW={1600}>
        <Places />
        <About />
      </Container>
    </>
  );
}

export default Home;

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
