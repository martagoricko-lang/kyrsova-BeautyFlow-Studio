import {
  getServiceById,
  getMastersByNames,
  timeSlots,
  bookAppointment,
} from "../beautyflow-library/index.js";

const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const service = getServiceById(serviceId);

const servicePage = document.getElementById("service-page");
const bookingForm = document.getElementById("booking-form");
const clientNameInput = document.getElementById("client-name");
const serviceNameInput = document.getElementById("service-name");
const subserviceSelect = document.getElementById("subservice-select");
const masterSelect = document.getElementById("master-select");
const selectedDateInput = document.getElementById("selected-date");
const selectedTimeSelect = document.getElementById("selected-time");
const bookingResult = document.getElementById("booking-result");

if (!service) {
  servicePage.innerHTML = `<h2>Service not found</h2>`;
} else {
  renderServicePage();
  renderSubservices();
  renderMasters();
  renderTimeSlots();
  serviceNameInput.value = service.name;
  clientNameInput.focus();
}

function renderServicePage() {
  const subservicesHtml = service.subservices
    .map((subservice) => {
      return `
            <div class="subservice-card" data-name="${subservice.name}">
                <h3>${subservice.name}</h3>
                <p>${subservice.description}</p>
                <p><strong>Price:</strong> ${subservice.price} UAH</p>
                <p><strong>Duration:</strong> ${subservice.duration}</p>
            </div>
        `;
    })
    .join("");

  servicePage.innerHTML = `
        <div class="service-header">
            <div>
                <h1>${service.name}</h1>
                <p class="service-category"><strong>Category:</strong> ${service.category}</p>
                <p class="service-category"><strong>Starting price:</strong> ${service.startingPrice} UAH</p>
            </div>
        </div>

        <div class="subservices-section">
            <h2>Available options</h2>
            <div class="subservices-grid">
                ${subservicesHtml}
            </div>
        </div>
    `;

  const cards = document.querySelectorAll(".subservice-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      subserviceSelect.value = name;

      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

function renderSubservices() {
  subserviceSelect.innerHTML = `<option value="">Choose service option</option>`;

  service.subservices.forEach((subservice) => {
    const option = document.createElement("option");
    option.value = subservice.name;
    option.textContent = `${subservice.name} — ${subservice.price} UAH`;
    subserviceSelect.appendChild(option);
  });

  subserviceSelect.addEventListener("change", () => {
    const selected = subserviceSelect.value;
    const cards = document.querySelectorAll(".subservice-card");

    cards.forEach((card) => {
      if (card.dataset.name === selected) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  });
}

function renderMasters() {
  const masters = getMastersByNames(service.masters);

  masterSelect.innerHTML = `<option value="">Choose a master</option>`;

  masters.forEach((master) => {
    const option = document.createElement("option");
    option.value = master.name;
    option.textContent = `${master.name} — ${master.specialty}`;
    masterSelect.appendChild(option);
  });
}

function renderTimeSlots() {
  selectedTimeSelect.innerHTML = `<option value="">Choose time</option>`;

  timeSlots.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    selectedTimeSelect.appendChild(option);
  });
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const clientName = clientNameInput.value.trim();
  const subserviceName = subserviceSelect.value;
  const masterName = masterSelect.value;
  const date = selectedDateInput.value;
  const time = selectedTimeSelect.value;

  if (!clientName || !subserviceName || !masterName || !date || !time) {
    bookingResult.textContent = "Please fill in all fields.";
    bookingResult.style.color = "red";
    return;
  }

  const appointment = bookAppointment(
    clientName,
    service.name,
    subserviceName,
    masterName,
    date,
    time,
  );
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(appointment);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  bookingResult.textContent = `Appointment booked for ${appointment.clientName}: ${appointment.subserviceName} (${appointment.serviceName}) with ${appointment.masterName} on ${appointment.date} at ${appointment.time}.`;

  bookingResult.style.color = "green";
  bookingResult.scrollIntoView({ behavior: "smooth" });

  bookingForm.reset();
  serviceNameInput.value = service.name;

  const cards = document.querySelectorAll(".subservice-card");
  cards.forEach((card) => card.classList.remove("active"));
});
