/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';
import { objMap } from './utils';

export default function Filterable({
  dataSource, additionalFilters, map,
}) {
  additionalFilters = additionalFilters || {};
  const minMax = {
    'price' : [0, 10000], 
    'rating' : [1, 5]
  };
  const checkin = useState(false);
  const kitchen = useState(false);
  const price = useState(minMax.price);
  const rating = useState(minMax.rating);

  const [data, loading, error] = useRemote(URIString(dataSource));

  const toggles = {kitchen, checkin};
  const sliderStates = {price, rating};
  const sliders = objMap(minMax, (key, val)=>[key, {minMax : val, range : sliderStates[key][0], setRange : sliderStates[key][1]}])
  const filterOptions = {
    toggles,
    sliders,
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
        ...objMap(toggles, (key, val)=>[key, val[0]]),
        ...objMap(sliders, (key, val)=>[key, val.range.join('-')]),
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
 * Reasons not to : Because that sounds complicated to think about. 
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