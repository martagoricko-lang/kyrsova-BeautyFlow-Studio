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
