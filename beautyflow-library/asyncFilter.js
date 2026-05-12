export function asyncFilterCallback(array, callback, done) {
  const result = [];
  let completed = 0;

  array.forEach((item, index) => {
    setTimeout(() => {
      if (callback(item)) {
        result.push(item);
      }

      completed++;

      if (completed === array.length) {
        done(result);
      }
    }, 300);
  });
}

export function asyncFilterPromise(array, callback, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject("Filtering aborted");
      return;
    }

    setTimeout(() => {
      if (signal?.aborted) {
        reject("Filtering aborted");
        return;
      }

      const result = array.filter(callback);
      resolve(result);
    }, 1000);
  });
}
