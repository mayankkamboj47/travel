import { useState } from 'react';
import useRemote from './hooks';
import FilterBar from './Filterbar';

export default function Filterable({
  dataSource, map,
}) {
  // dataSource will be used to fetch
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

/**
 * Filterbar :
 *
 * You have a list of 'somethings'. You need to sort these somethings, by some criteria.
 * Here is the criteria : (a, b) => a < b
 *
 * const MIN_PRICE = 0;
 * const MAX_PRICE  = 3500;
 * const MIN_ROOMS = 1;
 * const MAX_ROOMS = 6;
 * const AMENITIES = ['Wifi', 'Kitchen', 'Free Parking'];
 * let [currentMinPrice, setCurrentMinPrice] = useState(MIN_PRICE);
 * let [currentMaxPrice, setCurrentMaxPrice] = useState(MAX_PRICE);
 * let [currentMinRooms, setCurrentMinRooms] = useState(MIN_ROOMS);
 * let [currentMaxRooms, setCurrentMaxRooms] = useState(MAX_ROOMS);
 * let [currentAmenities, setCurrentAmenities] = useState(AMENITIES);
 * <FilterBar
 *   filterOptions={
 *   {
 *    "price" : {
 *       min : MIN_PRICE,
 *       max : 3500,
 *       onMinChange : setCurrentMinPrice,
 *       onMaxChange : setCurrentMaxPrice,
 *       currentMin : currentMinPrice,
 *       currentMax : currentMaxPrice
 *     },
 *    "rooms" : {
 *       min : 1,
 *       max : 6,
 *       onMinChange : setCurrentMinRooms,
 *       onMaxChange : setCurrentMaxRooms,
 *       currentMin : currentMinRooms,
 *       currentMax : currentMaxRooms
 *     },
 *    "amenities" : {
 *      all : ["Free Parking", "Wifi", "Kitchen"],
 *      current : ["Wifi"],
 *      onValueClick : (amenity)=>setCurrentAmenities(currentAmenities + [amenity])
 *    }
 *   }
 *  }
 *
 *  sortOptions = {
 *    "price" : {
 *      "ascending" : sortPriceByAscending,
 *      "descending" : sortPriceByDescending,
 *    },
 *    "rooms" : {
 *      "ascending" : sortRoomsByAscending,
 *      "descending": sortRoomsByDescending
 *    }
 *  }
 *
 *
 *
 * Once we are done designing, what properties do we actually want to put in the final UI ?
 *
 *
 * Filter
 *  By amenities : Wifi, Kitchen, Free Parking, etc.    (Iterate over cards and generate this)
 *  By price,
 *  Number of guests allowed,
 *  Number of bedrooms,
 *
 *
 *  What to do now :
 *  i. The design : A filter button, which on clicking opens a modal with all the fitler options
 *
 * ii. Get the list of filter options from the dataset.
 */