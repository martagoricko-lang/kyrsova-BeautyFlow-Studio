export function memoize(fn, limit = 10) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const value = cache.get(key);

      // LRU логіка
      cache.delete(key);
      cache.set(key, value);

      console.log("FROM CACHE");
      return value;
    }

    const result = fn(...args);

    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);

    console.log("CALCULATED");

    return result;
  };
}
