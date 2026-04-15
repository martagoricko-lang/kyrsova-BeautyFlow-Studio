export const services = [
  {
    id: 1,
    name: "Manicure",
    category: "Nails",
    startingPrice: 700,
    masters: ["Anna"],
    subservices: [
      {
        name: "Classic Manicure",
        description: "Nail shaping, cuticle care and a clean natural finish.",
        price: 700,
        duration: "1.5 hours",
      },
      {
        name: "Gel Polish Manicure",
        description:
          "Long-lasting manicure with gel coating and glossy finish.",
        price: 850,
        duration: "2 hours",
      },
      {
        name: "Nail Strengthening",
        description: "Extra care and strengthening for weak and thin nails.",
        price: 900,
        duration: "2 hours",
      },
    ],
  },
  {
    id: 2,
    name: "Pedicure",
    category: "Nails",
    startingPrice: 950,
    masters: ["Anna"],
    subservices: [
      {
        name: "Classic Pedicure",
        description: "Foot and nail care with a clean and polished finish.",
        price: 950,
        duration: "1.5 hours",
      },
      {
        name: "Spa Pedicure",
        description: "Relaxing pedicure with scrub, hydration and massage.",
        price: 1100,
        duration: "2 hours",
      },
      {
        name: "Gel Polish Pedicure",
        description: "Pedicure with durable gel polish coating.",
        price: 1150,
        duration: "2 hours",
      },
    ],
  },
  {
    id: 3,
    name: "Makeup",
    category: "Face",
    startingPrice: 1200,
    masters: ["Sofia"],
    subservices: [
      {
        name: "Day Makeup",
        description: "Soft and natural makeup for everyday look.",
        price: 1200,
        duration: "1.5 hours",
      },
      {
        name: "Evening Makeup",
        description: "Bright and expressive makeup for events.",
        price: 1500,
        duration: "2 hours",
      },
      {
        name: "Bridal Makeup",
        description: "Elegant long-lasting makeup for a wedding day.",
        price: 2000,
        duration: "2.5 hours",
      },
    ],
  },
  {
    id: 4,
    name: "Hair Styling",
    category: "Hair",
    startingPrice: 900,
    masters: ["Maria"],
    subservices: [
      {
        name: "Straight Styling",
        description: "Smooth and sleek hair styling.",
        price: 900,
        duration: "1 hour",
      },
      {
        name: "Waves",
        description: "Soft curls or beach-wave hairstyle.",
        price: 1100,
        duration: "1.5 hours",
      },
      {
        name: "Volume Styling",
        description: "Styling with extra root volume and shape.",
        price: 1200,
        duration: "1.5 hours",
      },
    ],
  },
  {
    id: 5,
    name: "Lashes",
    category: "Lashes",
    startingPrice: 850,
    masters: ["Maria"],
    subservices: [
      {
        name: "Lash Lift",
        description: "Natural lifting effect for your own lashes.",
        price: 850,
        duration: "1.2 hours",
      },
      {
        name: "Lash Tinting",
        description: "Darker and more expressive natural lashes.",
        price: 600,
        duration: "40 minutes",
      },
      {
        name: "Lash Extensions",
        description: "Longer, fuller and more dramatic lash effect.",
        price: 1300,
        duration: "2 hours",
      },
    ],
  },
  {
    id: 6,
    name: "Brows",
    category: "Brows",
    startingPrice: 500,
    masters: ["Sofia"],
    subservices: [
      {
        name: "Brow Correction",
        description: "Eyebrow shaping according to face type.",
        price: 500,
        duration: "30 minutes",
      },
      {
        name: "Brow Tinting",
        description: "Eyebrow coloring for a more defined look.",
        price: 550,
        duration: "35 minutes",
      },
      {
        name: "Brow Lamination",
        description: "Fixing hairs in the desired shape for a polished effect.",
        price: 800,
        duration: "1 hour",
      },
    ],
  },
  {
    id: 7,
    name: "Laser Hair Removal",
    category: "Body",
    startingPrice: 1000,
    masters: ["Sofia", "Maria"],
    subservices: [
      {
        name: "Upper Lip",
        description: "Quick treatment for the upper lip area.",
        price: 1000,
        duration: "30 minutes",
      },
      {
        name: "Underarms",
        description: "Laser treatment for a smooth underarm area.",
        price: 1400,
        duration: "40 minutes",
      },
      {
        name: "Arms",
        description: "Hair removal for full arms or half arms.",
        price: 1800,
        duration: "1 hour",
      },
      {
        name: "Legs",
        description: "Laser treatment for smooth legs.",
        price: 2500,
        duration: "1.5 hours",
      },
      {
        name: "Bikini Area",
        description: "Sensitive area treatment with long-term effect.",
        price: 2000,
        duration: "1 hour",
      },
    ],
  },
];

export const allMasters = [
  {
    name: "Anna",
    specialty: "Nail specialist",
    experience: "3 years",
  },
  {
    name: "Sofia",
    specialty: "Makeup artist and brow master",
    experience: "4 years",
  },
  {
    name: "Maria",
    specialty: "Hair and lashes specialist",
    experience: "5 years",
  },
];

export const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"];

export function getServiceById(id) {
  return services.find((service) => service.id === Number(id));
}

export function getMastersByNames(names) {
  return allMasters.filter((master) => names.includes(master.name));
}

export function findMostExpensiveService(servicesList) {
  let mostExpensive = servicesList[0];

  for (let service of servicesList) {
    if (service.startingPrice > mostExpensive.startingPrice) {
      mostExpensive = service;
    }
  }

  return mostExpensive;
}

export function bookAppointment(
  clientName,
  serviceName,
  subserviceName,
  masterName,
  date,
  time,
) {
  return {
    clientName,
    serviceName,
    subserviceName,
    masterName,
    date,
    time,
  };
}
