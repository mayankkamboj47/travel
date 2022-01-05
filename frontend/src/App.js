import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { sampleDetailsCard } from './Card';
import Nav from './Nav';
import Profile from './Profile';
import Search from './Search';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={sampleDetailsCard} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
