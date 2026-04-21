import { services } from "../beautyflow-library/index.js";
import {
  offerGenerator,
  consumeIteratorWithTimeout,
} from "../beautyflow-library/lab1.js";

const servicesList = document.getElementById("services-list");

const profileBtn = document.getElementById("profile-btn");
const bookingsBtn = document.getElementById("bookings-btn");

const openOffersButton = document.getElementById("open-offers-btn");
const closeOffersButton = document.getElementById("close-offers-btn");
const offersModal = document.getElementById("offers-modal");

const startOffersRotationButton = document.getElementById(
  "start-offers-rotation-btn",
);
const promoOfferText = document.getElementById("promo-offer-text");

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

if (startOffersRotationButton) {
  startOffersRotationButton.addEventListener("click", () => {
    startOffersRotationButton.disabled = true;
    startOffersRotationButton.textContent = "Running...";

    const iterator = offerGenerator();

    consumeIteratorWithTimeout(iterator, 6, (item) => {
      promoOfferText.classList.remove("fade");

      setTimeout(() => {
        promoOfferText.textContent = item.value;
        promoOfferText.classList.add("fade");
      }, 50);
    });

    setTimeout(() => {
      startOffersRotationButton.disabled = false;
      startOffersRotationButton.textContent = "Start rotating offers";
    }, 6000);
  });
}

renderServices();

const initialOffer = offerGenerator().next().value;
promoOfferText.textContent = initialOffer;
