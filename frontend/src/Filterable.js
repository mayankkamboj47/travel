/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import useRemote from './hooks';
import FilterBar from './Filterbar';
import { objMap, loadList } from './utils';

/**
filterable -> Filterbar
Parameters : 
  datasource <string> : A url to fetch data from. This data will be filtered based on the filters set within the Filterable component
  additionalFilters <object>: These filters do not show up in the filterbar. For options that you don't want the users to control. 
  map <function>: To transform the data that fetch(dataSource) returns incase the server response is not formatted desirably
*/
export default function Filterable({
  dataSource, additionalFilters, map,
}) {
  additionalFilters = additionalFilters || {};
  // define some constants to avoid using magic numbers
  const ranges = {
    price: [0, 10000],
    rating: [1, 5],
  };
  // start defining things we can filter with
  const [page, setPage] = useState(0); // page Number
  // yes or no filters. Does this place have a ...
  const kitchen = useState(false);
  const wifi = useState(false);
  const freeParking = useState(false);
  // and some range-based filters. Eg. show products in this price range with this rating. 
  const price = useState(ranges.price);
  const rating = useState(ranges.rating);
  // we'd want the UI to sometimes show better hints than just say 'price' or 'rating'. We'll also capitalise here to make it look better. Do it for the ranges...
  const sliderLabels = {
    price: 'Cost (INR ₹)',
    rating: 'Rating',
  };
  // And for toggles
  const toggles = { Kitchen: kitchen, 'Free parking': freeParking, Wifi: wifi };
  const sliderStates = { price, rating };
  /*
  Sliders : {<Label> : {
                minMax : [<number>, <number>],          // minimum and maximum possible the range can get
                range  : [<number>, <number>],          // what the range is right now
                setRange : <function>                   // a function to change the range
              }
              ...}
  */
  const sliders = objMap(
    ranges,
    (key, val) => [sliderLabels[key] || key,
      { minMax: val, range: sliderStates[key][0], setRange: sliderStates[key][1] }],
  );
  // generate url by combining datasource and filters, and request data using a hook
  const [data, loading, error] = useRemote(URIString(dataSource));

  const filterOptions = {
    toggles,
    sliders,
  };
  // if any of the filter options change, automatically set the page number to 0 as well
  useEffect(() => {
    setPage(0);
  }, [...Object.values(toggles).map((s) => s[0]), ...Object.values(sliderStates).map((s) => s[0])]);
  return (
    <div>
      <FilterBar filterOptions={filterOptions} />
      {loadList(data, loading, error, map)}
      <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Back</Button>
      <Button onClick={() => setPage(page + 1)} ml="2rem">Next</Button>
    </div>
  );
  /**
  Pass the filter parameters to dataSource as url query strings. Note : Datasource must support requests of the format we are sending
  Better than post methods because sharing query-based url preserves filters. 
  */
  function URIString(dataSource) {
    return `${dataSource}?${new URLSearchParams(
      {
        ...objMap(toggles, (key, val) => [key, val[0]]),
        ...objMap(sliderStates, (key, val) => [key, val[0].join('-')]),
        ...additionalFilters,
        page,
      },
    ).toString()}`;
  }
}
