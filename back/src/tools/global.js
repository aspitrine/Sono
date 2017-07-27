export const global = {};

/**
 *
 * @param key
 * @param value
 */
export function setGlobal(key, value) {
  global[key] = value;
}
