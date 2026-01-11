let incomeExpenseChart = null;
let categoryChart = null;

function renderIncomeExpenseChart() {
  const canvas = document.getElementById("incomeExpenseChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (incomeExpenseChart) {
    incomeExpenseChart.destroy();
  }

  incomeExpenseChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [
          calculateTotalIncome(),
          calculateTotalExpense()
        ],
        backgroundColor: ["#16a34a", "#dc2626"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function renderCategoryChart() {
  const canvas = document.getElementById("categoryChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (categoryChart) {
    categoryChart.destroy();
  }

  const expenses = {};
  getTransactions().forEach(txn => {
    if (txn.type === "expense") {
      expenses[txn.category] =
        (expenses[txn.category] || 0) + txn.amount;
    }
  });

  categoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(expenses),
      datasets: [{
        data: Object.values(expenses)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function updateCharts() {
  renderIncomeExpenseChart();
  renderCategoryChart();
}
