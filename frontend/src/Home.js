/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-unstable-nested-components */
import {
  Container, Heading, Text, Flex, UnorderedList, ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import { ImageCard } from './Card';

function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Container maxW={1600}>
        <Cities />
        <About />
      </Container>
      <Footer />
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
    city: 'New Delhi',
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
      <Flex style={{ gap: '1rem', overflow : 'auto' }}>
        {
        data.map(
          ({ image, city, state }) => (
            <Link to={`/search/all?location=${city}, ${state}, India`} key={image}>
              <ImageCard
                image={image}
                title={city}
                subtitle={state}
                key={city}
              />
            </Link>
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
        This project began as a programming assignment at Ashoka University. Check out the links in the footer to contact me, or just send an email at 
        mayankkamboj47@gmail.com
      </Text>
    </>
  );
}

function Footer(){
  return (
    <div style={{padding : '3rem', background : 'black', marginTop : '3rem', color: 'white'}}>
      <UnorderedList maxW={1600} m="0 auto" style={{listStyle : 'none'}}>
          <ListItem><a href="https://www.github.com/mayankkamboj47">Github</a></ListItem>
          <ListItem><a href="https://mayankkamboj47.github.io">Website</a></ListItem>
          <ListItem>♡</ListItem>
      </UnorderedList>
    </div>
  )
}