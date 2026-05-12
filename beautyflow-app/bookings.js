import { asyncFilterPromise } from "../beautyflow-library/index.js";

const cancelModal = document.getElementById("cancel-modal");
const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
const closeCancelBtn = document.getElementById("close-cancel-btn");

const bookingsList = document.getElementById("bookings-list");

const futureBookingsBtn = document.getElementById("future-bookings-btn");

const resetBookingsBtn = document.getElementById("reset-bookings-btn");

let bookingIndexToDelete = null;

function renderBookings(bookingsToRender = null) {
  const bookings =
    bookingsToRender ||
    JSON.parse(localStorage.getItem("beautyflow-bookings")) ||
    [];

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p>No bookings yet</p>";
    return;
  }

  bookings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  bookingsList.innerHTML = bookings
    .map(
      (b, index) => `
        <div class="booking-card">
            <h3>${b.serviceName}</h3>

            <p><strong>Option:</strong> ${b.subserviceName}</p>

            <p><strong>Master:</strong> ${b.masterName}</p>

            <p><strong>Date:</strong> ${b.date}</p>

            <p><strong>Time:</strong> ${b.time}</p>

            <button 
              class="cancel-booking-btn"
              data-index="${index}"
            >
              Cancel booking
            </button>
        </div>
    `,
    )
    .join("");

  const cancelButtons = document.querySelectorAll(".cancel-booking-btn");

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bookingIndexToDelete = button.dataset.index;

      cancelModal.classList.remove("hidden");
    });
  });
}

confirmCancelBtn.addEventListener("click", () => {
  const bookings =
    JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

  bookings.splice(bookingIndexToDelete, 1);

  localStorage.setItem("beautyflow-bookings", JSON.stringify(bookings));

  cancelModal.classList.add("hidden");

  renderBookings();
});

closeCancelBtn.addEventListener("click", () => {
  cancelModal.classList.add("hidden");
});

futureBookingsBtn.addEventListener("click", async () => {
  futureBookingsBtn.classList.add("active-filter");
  resetBookingsBtn.classList.remove("active-filter");

  const bookings =
    JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

  const today = new Date();

  const filtered = await asyncFilterPromise(
    bookings,
    (booking) => new Date(booking.date) >= today,
  );

  renderBookings(filtered);
});

resetBookingsBtn.addEventListener("click", () => {
  resetBookingsBtn.classList.add("active-filter");
  futureBookingsBtn.classList.remove("active-filter");

  renderBookings();
});

renderBookings();
