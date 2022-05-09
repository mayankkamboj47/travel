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
