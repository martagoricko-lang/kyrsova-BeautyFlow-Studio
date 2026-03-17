function showServices(services) {
  console.log("Available services");

  services.forEach((service) => {
    console.log(service.name + " - " + service.price + " UAH");
  });
}

function findMostExpensiveService(services) {
  let mostExpensive = services[0];

  services.forEach((service) => {
    if (service.price > mostExpensive.price) {
      mostExpensive = service;
    }
  });

  return mostExpensive;
}

export { showServices, findMostExpensiveService };
