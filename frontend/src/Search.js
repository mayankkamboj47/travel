import { useParams } from 'react-router-dom';
import Filterable from './Filterable';
import { DetailsCard } from './Card';

export default function Search() {
  const { query } = useParams();
  return (
    <Filterable
      dataSource={`http://localhost:3001/hotel/search/${query}`}
      map={({
        amenities, title, subtitle, rating, reviews, images, price, _id,
      }) => (
        <DetailsCard
          image={images[0]}
          title={title}
          caption={subtitle}
          rating={rating}
          reviews={reviews}
          price={price}
          amenities={amenities}
          key={_id}
          link={`/hotel/${_id}`}
          heartAction={() => axios.get(`http://localhost:3001/user/wishlist/add?hotel=${_id}`, { withCredentials: true }).then(() => alert('Added to wishlist'))}
        />
      )}
    />
  );
}
