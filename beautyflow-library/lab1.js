export function* offerGenerator() {
  const offers = [
    "Manicure + Pedicure — 1500 UAH",
    "Lashes + Brows — 1200 UAH",
    "Makeup + Hair Styling — 1900 UAH",
    "Laser Combo Package — 3500 UAH",
  ];

  let index = 0;

  while (true) {
    yield offers[index];
    index = (index + 1) % offers.length;
  }
}

export function consumeIteratorWithTimeout(iterator, seconds, callback) {
  const startTime = Date.now();
  let iteration = 1;

  const intervalId = setInterval(() => {
    const now = Date.now();

    if (now - startTime >= seconds * 1000) {
      clearInterval(intervalId);
      return;
    }

    const value = iterator.next().value;

    callback({
      iteration,
      value,
      time: new Date().toLocaleTimeString(),
    });

    iteration++;
  }, 1000);
}
