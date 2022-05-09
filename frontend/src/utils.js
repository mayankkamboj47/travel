import { Spinner } from '@chakra-ui/react';
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
  return data.length ? render(data) : <p>Wow, so empty</p>;
}
