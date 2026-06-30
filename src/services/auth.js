const ADMIN_EMAIL = "admin@jahvora.com";
const ADMIN_PASSWORD = "Yogesh@05";

export function login(email, password) {
  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    localStorage.setItem("jahvoraAdmin", "true");
    return true;
  }

  return false;
}

export function logout() {
  localStorage.removeItem("jahvoraAdmin");
}

export function isAuthenticated() {
  return localStorage.getItem("jahvoraAdmin") === "true";
}