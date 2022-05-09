/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';

export default function Filterable({
  dataSource, additionalFilters, map,
}) {
  additionalFilters = additionalFilters || {};
  const [selfCheckIn, setSelfCheckIn] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(10000);
  const [ratingFrom, setRatingFrom] = useState(1);
  const [ratingTo, setRatingTo] = useState(5);

  const [data, loading, error] = useRemote(URIString(dataSource));

  const toggles = { 'Self Check In': [selfCheckIn, setSelfCheckIn], Kitchen: [kitchen, setKitchen] };
  const filterOptions = {
    toggles,
    price : {
      min: 1,
      max: 10000,
      from: priceFrom,
      to: priceTo,
      setFrom: setPriceFrom,
      setTo: setPriceTo,
    },
    rating: {
      min: 1,
      max: 5,
      from: ratingFrom,
      to: ratingTo,
      setFrom: setRatingFrom,
      setTo: setRatingTo,
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
    const toggleVals = {};
    for(let key in toggles) toggleVals[key] = toggles[key][0];
    return `${dataSource}?${new URLSearchParams(
      {
        ...toggleVals,
        price: [priceFrom, priceTo].join('-'),
        rating: [ratingFrom, ratingTo].join('-'),
        ...additionalFilters,  // remove the additionalFilters, instead add 'defaults' for the already existing state filters
      },
    ).toString()}`;
  }


/**
 * 
 * Filters = 
 * toggles : {
 *   'kitchen' : [kitchen, setKitchen], 
 *   '....   ' : [...]
 * }, 
 * 
 * 
 * We don't want to generate so many state variables. Can we have a central filtered state
 * from where they all get their stuff ? 
 * 
 * We have a uppercase, lowercase and string sensitive issue too, how to deal with that. 
 * 
 * 
 * We need a whole object called toggles as state. The UI indicates that, and the way we are making our calls indicates that. 
 * We can also then manufacture toggles solely based on the data we have. 
 * 
 * Issue with manufacturing toggles based on the data : 
 *   1. Which data are we talking about ? The one we get after the filters, will be limited in what toggles and filters it gives us. 
 *   The server will have to tell us therefore, but regardless, this is a good feature. 
 */