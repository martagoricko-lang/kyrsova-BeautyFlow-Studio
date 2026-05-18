export function* offerGenerator() {
  const offers = [
    {
      title: "Manicure + Pedicure — 1500 UAH",

      description: "Perfect care for hands and feet in one visit.",
    },

    {
      title: "Lashes + Brows — 1200 UAH",

      description: "A complete eye area beauty combo for a fresh look.",
    },

    {
      title: "Makeup + Hair Styling — 1900 UAH",

      description: "Ideal combo for events and special occasions.",
    },

    {
      title: "Laser Combo Package — 3500 UAH",

      description: "Underarms, bikini area and upper lip package.",
    },
  ];

  let index = 0;

  while (true) {
    yield offers[index];
    index = (index + 1) % offers.length;
  }
}
