import {
  memoizedGetServiceById,
  getMastersByNames,
  timeSlots,
  bookAppointment,
} from "../beautyflow-library/index.js";

const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const service = memoizedGetServiceById(serviceId);

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
  console.log("Loaded service:", service.name);

  renderServicePage();
  renderSubservices();
  renderMasters();
  renderTimeSlots();

  serviceNameInput.value = service.name;
  clientNameInput.focus();
}

function renderServicePage() {
  const subservicesHtml = service.subservices
    .map(
      (sub) => `
      <div class="subservice-card" data-name="${sub.name}">
        <h3>${sub.name}</h3>
        <p>${sub.description}</p>
        <p><strong>Price:</strong> ${sub.price} UAH</p>
        <p><strong>Duration:</strong> ${sub.duration}</p>
      </div>
    `,
    )
    .join("");

  servicePage.innerHTML = `
    <h1>${service.name}</h1>
    <div class="subservices-grid">${subservicesHtml}</div>
  `;

  const cards = document.querySelectorAll(".subservice-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      subserviceSelect.value = card.dataset.name;
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

function renderSubservices() {
  subserviceSelect.innerHTML = `<option value="">Choose service option</option>`;

  service.subservices.forEach((sub) => {
    const option = document.createElement("option");
    option.value = sub.name;
    option.textContent = `${sub.name} — ${sub.price} UAH`;
    subserviceSelect.appendChild(option);
  });
}

function renderMasters() {
  const masters = getMastersByNames(service.masters);

  masterSelect.innerHTML = `<option value="">Choose a master</option>`;

  masters.forEach((master) => {
    const option = document.createElement("option");
    option.value = master.name;
    option.textContent = master.name;
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

  bookingResult.textContent = `Booked for ${appointment.clientName}`;
  bookingResult.style.color = "green";

  bookingForm.reset();
  serviceNameInput.value = service.name;
});
