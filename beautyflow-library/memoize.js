export function memoize(fn, limit = 10) {
  const cache = new Map();
  let hits = 0;
  let misses = 0;

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const value = cache.get(key);

      // LRU логіка
      cache.delete(key);
      cache.set(key, value);

      hits++;

      console.log(`FROM CACHE | Hits: ${hits}`);
      return value;
    }

    misses++;

    console.log(`CALCULATING | Misses: ${misses}`);

    const result = fn(...args);

    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);

    return result;
  };
}
