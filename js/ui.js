function renderTransactionsTable() {
  const tableBody = document.getElementById("transactionTableBody");
  const transactions = getTransactions();

  tableBody.innerHTML = "";

  if (transactions.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">No transactions yet</td>
      </tr>
    `;
    return;
  }

  transactions.forEach(txn => {
    const exceeded = isBudgetExceeded(txn.category);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.category}</td>
      <td>${txn.type}</td>
      <td>₹${txn.amount}</td>
      <td>
        <button data-id="${txn.id}" class="delete-btn">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
    if (txn.type === "expense" && exceeded) {
    row.style.backgroundColor = "#fee2e2";
}

  });
}
function renderSummaryCards() {
  const incomeEl = document.querySelector("#totalIncome p");
  const expenseEl = document.querySelector("#totalExpense p");
  const balanceEl = document.querySelector("#balance p");

  const income = calculateTotalIncome();
  const expense = calculateTotalExpense();
  const balance = calculateBalance();

  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;
  balanceEl.textContent = `₹${balance}`;
}
