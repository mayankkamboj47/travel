import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { Cards } from './Card';
import Nav from './Nav';
import Profile from './Profile';
import Search from './Search';
import HotelPage from './HotelPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Cards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search/:query" element={<Search />} />
        <Route path="/hotelpage"><HotelPage /></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
