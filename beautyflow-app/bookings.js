import {
  asyncFilterPromise,
  bookingStream,
  EventEmitter,
} from "../beautyflow-library/index.js";

const cancelModal = document.getElementById("cancel-modal");
const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
const closeCancelBtn = document.getElementById("close-cancel-btn");

const bookingsList = document.getElementById("bookings-list");

const futureBookingsBtn = document.getElementById("future-bookings-btn");

const resetBookingsBtn = document.getElementById("reset-bookings-btn");

let bookingIndexToDelete = null;
const bookingEmitter = new EventEmitter();

const notification = document.getElementById("notification");

function bookingLogger(data) {
  console.log("Booking event:", data);
}

function bookingNotification(data) {
  notification.textContent = data.message;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 2500);
}

bookingEmitter.subscribe("bookingCancelled", bookingLogger);

bookingEmitter.subscribe("bookingCancelled", bookingNotification);

async function loadBookings() {
  bookingsList.innerHTML = `
  <div class="loading-state">
    <div class="loader"></div>
    <p>Loading bookings...</p>
  </div>
`;

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const bookings =
    JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

  renderBookings(bookings);
}

function renderBookings(bookingsToRender = null) {
  const bookings =
    bookingsToRender !== null
      ? bookingsToRender
      : JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

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
  requestAnimationFrame(() => {
    const cards = document.querySelectorAll(".booking-card");

    cards.forEach((card) => {
      card.classList.add("fade-in");
    });
  });

  const cancelButtons = document.querySelectorAll(".cancel-booking-btn");

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bookingIndexToDelete = button.dataset.index;

      cancelModal.classList.remove("hidden");
    });
  });
}

async function loadBookingsStream(bookings) {
  bookings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  for await (const booking of bookingStream(bookings)) {
    const index = bookings.indexOf(booking);

    const card = document.createElement("div");

    card.classList.add("booking-card");

    card.innerHTML = `
    <h3>${booking.serviceName}</h3>

    <p><strong>Option:</strong> ${booking.subserviceName}</p>

    <p><strong>Master:</strong> ${booking.masterName}</p>

    <p><strong>Date:</strong> ${booking.date}</p>

    <p><strong>Time:</strong> ${booking.time}</p>

    <button 
      class="cancel-booking-btn"
      data-index="${index}"
    >
      Cancel booking
    </button>
`;

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    bookingsList.appendChild(card);

    setTimeout(() => {
      card.style.transition = "all 0.4s ease";

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 50);

    const cancelButtons = document.querySelectorAll(".cancel-booking-btn");

    cancelButtons.forEach((button) => {
      button.addEventListener("click", () => {
        bookingIndexToDelete = button.dataset.index;

        cancelModal.classList.remove("hidden");
      });
    });
  }
}

confirmCancelBtn.addEventListener("click", () => {
  const bookings =
    JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

  bookings.splice(bookingIndexToDelete, 1);

  localStorage.setItem("beautyflow-bookings", JSON.stringify(bookings));

  bookingEmitter.emit("bookingCancelled", {
    message: "Booking cancelled successfully",
  });

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

  bookingsList.innerHTML = "";

  loadBookingsStream(filtered);
});

resetBookingsBtn.addEventListener("click", () => {
  resetBookingsBtn.classList.add("active-filter");
  futureBookingsBtn.classList.remove("active-filter");

  const bookings =
    JSON.parse(localStorage.getItem("beautyflow-bookings")) || [];

  bookingsList.innerHTML = "";

  loadBookingsStream(bookings);
});

loadBookings();
