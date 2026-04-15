const profileBtn = document.getElementById("profile-btn");
import { services } from "../beautyflow-library/index.js";

const servicesList = document.getElementById("services-list");
const openOffersButton = document.getElementById("open-offers-btn");
const closeOffersButton = document.getElementById("close-offers-btn");
const offersModal = document.getElementById("offers-modal");

function renderServices() {
  servicesList.innerHTML = "";

  services.forEach((service) => {
    const card = document.createElement("div");
    card.classList.add("service-card", "service-card-clickable");

    card.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Category:</strong> ${service.category}</p>
            <p><strong>Starting price:</strong> ${service.startingPrice} UAH</p>
            <p><strong>Available options:</strong> ${service.subservices.length}</p>
        `;

    card.addEventListener("click", () => {
      window.location.href = `service.html?id=${service.id}`;
    });

    servicesList.appendChild(card);
  });
}

openOffersButton.addEventListener("click", () => {
  offersModal.classList.remove("hidden");
});

closeOffersButton.addEventListener("click", () => {
  offersModal.classList.add("hidden");
});

offersModal.addEventListener("click", (event) => {
  if (event.target === offersModal) {
    offersModal.classList.add("hidden");
  }
});

renderServices();
profileBtn.addEventListener("click", () => {
  window.location.href = "auth.html";
});
