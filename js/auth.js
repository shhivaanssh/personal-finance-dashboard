const AUTH_KEY = "finance_user";

function loginUser(username) {
  const user = {
    name: username,
    loggedInAt: Date.now()
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

function getCurrentUser() {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

function isAuthenticated() {
  return getCurrentUser() !== null;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById("username");
      const username = usernameInput.value.trim();

      if (!username) return;

      loginUser(username);
      window.location.href = "index.html";
    });
  }
});
