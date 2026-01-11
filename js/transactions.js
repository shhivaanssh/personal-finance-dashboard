const TRANSACTION_KEY = "finance_transactions";
function getTransactions() {
  return getFromStorage(TRANSACTION_KEY);
}
function addTransaction({ amount, type, category, date }) {
  const transactions = getTransactions();

  const newTransaction = {
    id: crypto.randomUUID(),
    amount: Number(amount),
    type,
    category,
    date,
    createdAt: Date.now()
  };

  transactions.push(newTransaction);
  saveToStorage(TRANSACTION_KEY, transactions);

  return newTransaction;
}
function deleteTransaction(id) {
  const transactions = getTransactions();
  const updated = transactions.filter(txn => txn.id !== id);
  saveToStorage(TRANSACTION_KEY, updated);
}
function calculateTotalIncome() {
  const transactions = getTransactions();

  return transactions
    .filter(txn => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);
}
function calculateTotalExpense() {
  const transactions = getTransactions();

  return transactions
    .filter(txn => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);
}
function calculateBalance() {
  return calculateTotalIncome() - calculateTotalExpense();
}
function calculateCategoryExpense(category) {
  const transactions = getTransactions();

  return transactions
    .filter(txn => txn.type === "expense" && txn.category === category)
    .reduce((sum, txn) => sum + txn.amount, 0);
}
