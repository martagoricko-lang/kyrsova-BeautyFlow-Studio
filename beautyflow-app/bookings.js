const bookingsList = document.getElementById("bookings-list");

function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p>No bookings yet</p>";
    return;
  }

  bookingsList.innerHTML = bookings
    .map(
      (b) => `
        <div class="booking-card">
            <h3>${b.serviceName}</h3>
            <p><strong>Option:</strong> ${b.subserviceName}</p>
            <p><strong>Master:</strong> ${b.masterName}</p>
            <p><strong>Date:</strong> ${b.date}</p>
            <p><strong>Time:</strong> ${b.time}</p>
        </div>
    `,
    )
    .join("");
}

renderBookings();
