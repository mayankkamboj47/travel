import { useParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

export default function Search() {
  /**
   * This component will render a list of cards based on the search query, the
   * filtering process will, in this case, be decided by the backend and we will
   * merely hook it using a url
   */
  const { query } = useParams();
  return <Text>{query}</Text>;
}
