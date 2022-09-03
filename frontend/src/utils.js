import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
/**
 *
 * @param {Object} obj
 * @param {Function} map
 *
 * Usage : objMap(object, (key, value)=>[newKey, newValue])
 */
export function objMap(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map((e) => func(...e)),
  );
}
export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function loadList(data, isLoading, hasError, render) {
  if (isLoading) {
    return <div><Spinner /></div>;
  }
  if (hasError) {
    return <p>Something nasty happened on our server or on your end</p>;
  }
  return data.length ? <div id='searchResults'>{render(data)}</div> : <p>Wow, so empty</p>;
}

export function loadData(url) {
  const local = localStorage.getItem(url);
  if (local) return Promise.resolve(JSON.parse(local));
  return new Promise((resolve, reject) => {
    axios.get(url, { withCredentials: true }).then(
      ({ data }) => {
        localStorage.setItem(url, JSON.stringify(data));
        resolve(data);
      },
    ).catch(reject);
  });
}

export function setData(url, data) {
  localStorage.setItem(url, JSON.stringify(data));
  /* return new Promise((resolve, reject) => {
    axios.put(url, { withCredentials: true }).then(
      ({ x }) => {
        resolve(x);
      },
    ).catch(reject);
  });
  */
  return Promise.resolve();
}
