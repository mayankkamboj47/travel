import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useRemote(url, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(
    () => {
      async function fetchData() {
        try {
          const res = await axios.get(url, { withCredentials: true });
          setData(res.data);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url],
  );
  return [data, loading, error];
}
