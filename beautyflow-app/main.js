import { services } from "../beautyflow-library/index.js";
import { offerGenerator } from "../beautyflow-library/generators.js";
import { consumeIteratorWithTimeout } from "../beautyflow-library/iterators.js";

const servicesList = document.getElementById("services-list");

const profileBtn = document.getElementById("profile-btn");
const bookingsBtn = document.getElementById("bookings-btn");

const openOffersButton = document.getElementById("open-offers-btn");
const closeOffersButton = document.getElementById("close-offers-btn");
const offersModal = document.getElementById("offers-modal");

const promoOfferText = document.getElementById("promo-offer-text");
const startOffersBtn = document.getElementById("start-offers-rotation-btn");
const stopOffersBtn = document.getElementById("stop-offers-rotation-btn");

let rotationActive = false;

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

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    window.location.href = "auth.html";
  });
}

if (bookingsBtn) {
  bookingsBtn.addEventListener("click", () => {
    window.location.href = "bookings.html";
  });
}

if (openOffersButton) {
  openOffersButton.addEventListener("click", () => {
    offersModal.classList.remove("hidden");
  });
}

if (closeOffersButton) {
  closeOffersButton.addEventListener("click", () => {
    offersModal.classList.add("hidden");
  });
}

if (offersModal) {
  offersModal.addEventListener("click", (event) => {
    if (event.target === offersModal) {
      offersModal.classList.add("hidden");
    }
  });
}

if (startOffersBtn) {
  startOffersBtn.addEventListener("click", async () => {
    if (rotationActive) return;

    rotationActive = true;
    startOffersBtn.disabled = true;
    startOffersBtn.textContent = "Running...";

    const generator = offerGenerator();

    await consumeIteratorWithTimeout(
      generator,
      10,
      (offer) => {
        promoOfferText.classList.remove("fade");

        setTimeout(() => {
          promoOfferText.textContent = offer;
          promoOfferText.classList.add("fade");
        }, 50);
      },
      () => rotationActive,
    );

    rotationActive = false;
    startOffersBtn.disabled = false;
    startOffersBtn.textContent = "Start rotating offers";
  });
}

if (stopOffersBtn) {
  stopOffersBtn.addEventListener("click", () => {
    rotationActive = false;
    startOffersBtn.disabled = false;
    startOffersBtn.textContent = "Start rotating offers";
  });
}

renderServices();

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeMenu = document.getElementById("close-menu");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
}
