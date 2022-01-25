import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';

export default function Filterable({
  dataSource, map,
}) {
  const [featured, setFeatured] = useState(false);
  const [kitchen, setKitchen] = useState(false);

  const [data, loading, error] = useRemote(kitchen ? 'http://localhost:8081/places' : dataSource);

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
}
