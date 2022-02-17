/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';
import { DetailsCard } from './Card';

export default function Filterable({
  dataSource, additionalFilters, map,
}) {
  additionalFilters = additionalFilters || {};
  const [selfCheckIn, setSelfCheckIn] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [currentMinPrice, setCurrentMinPrice] = useState(0);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(10000);
  const [currentMinRating, setCurrentMinRating] = useState(1);
  const [currentMaxRating, setCurrentMaxRating] = useState(5);

  const [data, loading, error] = useRemote(URIString(dataSource));

  const filterOptions = {
    toggles: { 'Self check-in': [selfCheckIn, setSelfCheckIn], Kitchen: [kitchen, setKitchen] },
    price: {
      min: 1,
      max: 10000,
      currentMin: currentMinPrice,
      currentMax: currentMaxPrice,
      onMinChange: setCurrentMinPrice,
      onMaxChange: setCurrentMaxPrice,
    },
    rating: {
      min: 1,
      max: 5,
      currentMin: 1,
      currentMax: 5,
      onMinChange: setCurrentMinRating,
      onMaxChange: setCurrentMaxRating,
    },
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      <FilterBar filterOptions={filterOptions} />
      {data.map(map)}
    </div>
  );

  function URIString(dataSource) {
    return `${dataSource}?${new URLSearchParams(
      {
        Kitchen: kitchen,
        'Self check-in': selfCheckIn,
        price: [currentMinPrice, currentMaxPrice].join('-'),
        rating: [currentMinRating, currentMaxRating].join('-'),
        ...additionalFilters,
      },
    ).toString()}`;
  }
}
