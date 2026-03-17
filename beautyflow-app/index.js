import { showServices, findMostExpensiveService } from "beautyflow-library";

const services = [
  { name: "Manicure", price: 700 },
  { name: "Makeup", price: 1200 },
  { name: "Hair styling", price: 900 },
];

console.log("BeautyFlow Studio project started");
console.log("");

showServices(services);

console.log("");

const mostExpensiveService = findMostExpensiveService(services);
console.log("Most expensive service:");
console.log(
  mostExpensiveService.name + " - " + mostExpensiveService.price + " UAH",
);
