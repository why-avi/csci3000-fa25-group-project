// reports.js — renders the Reports page using localStorage (via storage.js helpers)

document.addEventListener('DOMContentLoaded', () => {
	const totalIncomeEl = document.getElementById('total-income');
	const totalExpensesEl = document.getElementById('total-expenses');
	const remainingEl = document.getElementById('remaining');

	const budgetsTbody = document.getElementById('budgets-tbody');
	const incomesTbody = document.getElementById('incomes-tbody');
	const expensesTbody = document.getElementById('expenses-tbody');

	function formatCurrency(v) {
		return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Number(v || 0));
	}

	function render() {
		// Use storage.js helpers
		const budgets = typeof getBudgets === 'function' ? getBudgets() : [];
		const transactions = typeof getTransactions === 'function' ? getTransactions() : [];

		const incomes = transactions.filter(t => t.type === 'income');
		const expenses = transactions.filter(t => t.type === 'expense');

		const totalIncome = incomes.reduce((s, i) => s + Number(i.amount || 0), 0);
		const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
		const remaining = totalIncome - totalExpenses;

		// Update totals
		if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(totalIncome);
		if (totalExpensesEl) totalExpensesEl.textContent = formatCurrency(totalExpenses);
		if (remainingEl) {
			remainingEl.textContent = formatCurrency(remaining);
			remainingEl.classList.remove('text-primary', 'text-danger');
			remainingEl.classList.add(remaining >= 0 ? 'text-primary' : 'text-danger');
		}

		// Render budgets
		if (budgetsTbody) {
			budgetsTbody.innerHTML = '';
			if (budgets.length === 0) {
				budgetsTbody.innerHTML = '<tr><td colspan="2" class="text-muted">No budgets yet</td></tr>';
			} else {
				budgets.forEach(b => {
					const tr = document.createElement('tr');
					const name = b.category ?? b.name ?? 'Unnamed';
					const amount = b.limit ?? b.amount ?? 0;
					tr.innerHTML = `<td>${escapeHtml(name)}</td><td class="text-end">${formatCurrency(amount)}</td>`;
					budgetsTbody.appendChild(tr);
				});
			}
		}

		// Render incomes
		if (incomesTbody) {
			incomesTbody.innerHTML = '';
			if (incomes.length === 0) {
				incomesTbody.innerHTML = '<tr><td colspan="2" class="text-muted">No incomes yet</td></tr>';
			} else {
				incomes.forEach(i => {
					const tr = document.createElement('tr');
					const source = i.description || i.category || 'Source';
					tr.innerHTML = `<td>${escapeHtml(source)}</td><td class="text-end">${formatCurrency(i.amount)}</td>`;
					incomesTbody.appendChild(tr);
				});
			}
		}

		// Render expenses
		if (expensesTbody) {
			expensesTbody.innerHTML = '';
			if (expenses.length === 0) {
				expensesTbody.innerHTML = '<tr><td colspan="2" class="text-muted">No expenses yet</td></tr>';
			} else {
				expenses.forEach(e => {
					const tr = document.createElement('tr');
					const desc = e.description || e.category || 'Expense';
					tr.innerHTML = `<td>${escapeHtml(desc)}</td><td class="text-end">${formatCurrency(e.amount)}</td>`;
					expensesTbody.appendChild(tr);
				});
			}
		}
	}

	// Small helper to avoid injecting raw HTML from stored values
	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	// Initial render
	render();

	// Re-render when storage changes in another tab
	window.addEventListener('storage', (e) => {
		if (['transactions','budgets','categories'].includes(e.key)) render();
	});

	// Expose a manual refresh helper (optional)
	window.reportsRefresh = render;
});