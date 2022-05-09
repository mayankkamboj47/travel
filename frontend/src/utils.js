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
