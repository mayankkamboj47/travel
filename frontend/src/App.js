import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Profile from './Profile';
import Search from './Search';
import HotelPage from './HotelPage';
import { LoginForm, SignUpForm } from './Forms';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search/:query" element={<Search />} />
        <Route
          path="/hotel/:id"
          element={(
            <HotelPage />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
