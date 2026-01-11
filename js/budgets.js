const BUDGET_KEY = "finance_budgets";

function getBudgets() {
  return getObjectFromStorage(BUDGET_KEY);
}

function setBudget(category, amount) {
  const budgets = getBudgets();
  budgets[category] = Number(amount);
  saveToStorage(BUDGET_KEY, budgets);
}

function getBudgetForCategory(category) {
  const budgets = getBudgets();
  return budgets[category] || null;
}
function isBudgetExceeded(category) {
  const budget = getBudgetForCategory(category);
  if (!budget) return false;

  const spent = calculateCategoryExpense(category);
  return spent > budget;
}
