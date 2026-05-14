import { EventEmitter } from "../beautyflow-library/index.js";

const authEmitter = new EventEmitter();

const createAccountBtn = document.querySelector("button");
const authNotificationBox = document.getElementById("auth-notification");

function authLogger(data) {
  console.log("Auth event:", data);
}

function authNotification(data) {
  authNotificationBox.textContent = data.message;

  authNotificationBox.classList.remove("hidden");

  authNotificationBox.classList.remove("success");
  authNotificationBox.classList.remove("error");

  authNotificationBox.classList.add(data.type);

  setTimeout(() => {
    authNotificationBox.classList.add("hidden");
  }, 2500);
}

authEmitter.subscribe("accountCreated", authLogger);

authEmitter.subscribe("accountCreated", authNotification);

createAccountBtn.addEventListener("click", () => {
  const name = document.querySelector('input[type="text"]').value;

  const email = document.querySelector('input[type="email"]').value;

  const password = document.querySelector('input[type="password"]').value;

  if (!name || !email || !password) {
    authEmitter.emit("accountCreated", {
      message: "Please fill in all fields",
      type: "error",
    });

    return;
  }

  authEmitter.emit("accountCreated", {
    message: "Account created successfully ✨",
    type: "success",
  });
});
