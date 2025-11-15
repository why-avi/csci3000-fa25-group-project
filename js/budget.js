// budget.js — handles the Budgets page logic

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("budget-form");
  const list = document.getElementById("budget-list");

  renderBudgets();

  form.addEventListener("submit", e => {
    e.preventDefault();

    const category = document.getElementById("budget-category").value.trim();
    const limit = Number(document.getElementById("budget-limit").value);
    const description = document.getElementById("budget-description").value.trim();

    if (!category || limit <= 0) {
      alert("Please fill out category and limit properly.");
      return;
    }

    const budget = {
      id: Date.now(),
      category,
      limit,
      description
    };

    addBudget(budget);
    renderBudgets();
    form.reset();
  });

  function renderBudgets() {
    const budgets = getBudgets();
    list.innerHTML = "";

    if (budgets.length === 0) {
      list.innerHTML = "<li>No budgets yet.</li>";
      return;
    }

    budgets.forEach(b => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${b.category}</strong> — $${b.limit.toFixed(2)}
        <br><small>${b.description || ""}</small>
        <button class="deleteButton" data-id="${b.id}">Delete</button>
      `;
      list.appendChild(li);
    });

    // Attach delete events
    document.querySelectorAll(".deleteButton").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        deleteBudget(id);
        renderBudgets();
      });
    });
  }
});
