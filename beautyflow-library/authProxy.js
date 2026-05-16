export class AuthProxy {
  constructor(token) {
    this.token = token;
  }

  async request(action) {
    console.log("Checking authentication...");
    console.log("Request started at:", new Date().toLocaleTimeString());

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!this.token) {
      throw new Error("Access denied. No token.");
    }

    console.log("Token verified");
    console.log("Request approved");

    console.log("Executing protected action...");
    return action();
  }
}
