import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { DetailsCard } from './Card';

function App() {
  const detailsCard = (
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
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={detailsCard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
