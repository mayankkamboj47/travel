import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { Cards } from './Card';
import Nav from './Nav';
import Profile from './Profile';
import Search from './Search';
import HotelPage from './HotelPage';

function App() {
  const hotelData = {
    rooms: {
      guests: 16.0, bedrooms: 5.0, beds: 5.0, bathrooms: 6.5,
    },
    amenities: ['Wifi', 'Kitchen', 'Free parking'],
    title: 'CasaMo, Silver Oak',
    rating: 4.67,
    reviews: 6,
    images: ['https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/55c6dc97-3d6e-43b8-af2c-5a3501efc8cc.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/5e9616c4-c6cf-4433-89bc-d5f213324320.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/653db8f7-8884-4369-b700-f4334c272166.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/75903290-e051-4d5b-bce2-b6818fd7dedf.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-31084171/original/9f7a0843-f3a2-4cdc-86da-2593c9644373.jpeg?im_w=720'],
    price: '\u20b935,200',
    description: 'This is the best hotel there is period',
    location: 'Mahabaleshwar, Maharashtra, India',
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Cards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search/:query" element={<Search />} />
        <Route
          path="/hotelpage"
          element={(
            <HotelPage
              title={hotelData.title}
              rating={hotelData.rating}
              reviews={hotelData.reviews}
              location={hotelData.location}
              images={hotelData.images}
              description={hotelData.description}
            />
)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
