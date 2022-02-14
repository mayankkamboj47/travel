/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';

/**
 * Usage :
 *
 *    <Filterable
        dataSource="http://localhost:8080/places"
        map={({
          amenities, title, subtitle, rating, reviews, images, price,
        }) => (
          <DetailsCard
            image={images[0]}
            title={title}
            caption={subtitle}
            rating={rating}
            reviews={reviews}
            price={price}
            amenities={amenities}
          />
        )}
      />

 */
export default function Filterable({
  dataSource, map,
}) {
  const [featured, setFeatured] = useState(false);
  const [kitchen, setKitchen] = useState(false);

  const [data, loading, error] = useRemote(URIString(dataSource));

  const filterOptions = {
    toggles: { Featured: [featured, setFeatured], Kitchen: [kitchen, setKitchen] },
    price: {
      min: 1,
      max: 100,
      currentMin: 4,
      currentMax: 92,
      onMinChange: console.log,
      onMaxChange: console.log,
    },
    date: {
      min: 1,
      max: 100,
      currentMin: 4,
      currentMax: 92,
      onMinChange: console.log,
      onMaxChange: console.log,
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
    return `${dataSource}/${URLSearchParams({ kitchen, featured }).toString()}`;
  }
}

// urlSearchParams
