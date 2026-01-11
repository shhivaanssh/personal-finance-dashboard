console.log("APP LOADED");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  // 🔐 AUTH CHECK
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const user = getCurrentUser();
  console.log("Logged in as:", user.name);

  // 🔄 INITIAL RENDER
  renderTransactionsTable();
  renderSummaryCards();
  updateCharts();

  // 🚪 LOGOUT
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  // ➕ ADD TRANSACTION (THIS WAS BROKEN BEFORE)
  const form = document.getElementById("transactionForm");
  console.log("FORM ELEMENT:", form);

  if (form) {
    form.addEventListener("submit", (e) => {
      console.log("FORM SUBMIT EVENT");
      e.preventDefault();

      const amount = document.getElementById("amount").value;
      const type = document.getElementById("type").value;
      const category = document.getElementById("category").value;
      const date =
        document.getElementById("date").value ||
        new Date().toISOString().split("T")[0];

      if (!amount || !category) return;

      addTransaction({ amount, type, category, date });

      renderTransactionsTable();
      renderSummaryCards();
      updateCharts();

      form.reset();
    });
  }

  // ❌ DELETE TRANSACTION
  const tableBody = document.getElementById("transactionTableBody");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;

        deleteTransaction(id);

        renderTransactionsTable();
        renderSummaryCards();
        updateCharts();
      }
    });
  }

  const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

});
