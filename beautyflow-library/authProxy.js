export class AuthProxy {
  constructor(token) {
    this.token = token;
  }

  async request(action) {
    console.log("Checking authentication...");

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!this.token) {
      throw new Error("Access denied. No token.");
    }

    console.log("Token verified");

    return action();
  }
}
