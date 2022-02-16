/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-unstable-nested-components */
import {
  Container, Heading, Text, Flex, Spinner,
} from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import { ImageCard, DetailsCard } from './Card';

function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Container maxW={1600}>
        <Cities />
        <About />
      </Container>
    </React.Fragment>
  );
}

export default Home;

function Cities() {
  const data = [{
    image: 'https://www.whitepeaktours.com/wp-content/uploads/2019/12/himachal-pradesh-shimla-147617008042-orijgp.jpg',
    city: 'Shimla',
    state: 'Himachal Pradesh',
  }, {
    image: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg',
    city: 'Delhi',
    state: 'Delhi',
  },
  {
    image: 'https://lonelyplanetimages.imgix.net/mastheads/80840681.jpg?sharp=10&vib=20&w=1200',
    city: 'Kolkata',
    state: 'West Bengal',
  },
  ];
  return (
    <>
      <Heading my="1rem">Places</Heading>
      <Flex style={{ gap: '1rem' }}>
        {
        data.map(
          ({ image, city, state }) => (
            <ImageCard
              image={image}
              title={city}
              subtitle={state}
              key={city}
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
