import { useState } from 'react';
import useRemote from './hooks';

export default function SampleLoader() {
  const [url, setUrl] = useState('http://localhost:8080/places');
  const [data, loading, error] = useRemote(url);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error !</p>;
  return (
    <p>
      {data[0].city}
      {' '}
      is in
      {' '}
      {data[0].country}
      <button type="button" label="Change city" onClick={() => setUrl('http://localhost:8080/otherplaces')}>
        Change city
      </button>
    </p>
  );
}
