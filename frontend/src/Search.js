import { useParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

export default function Search() {
  const { query } = useParams();
  return <Text>{query}</Text>;
}
