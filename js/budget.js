// budget.js — handles the Budgets page logic

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("budget-form");
  const list = document.getElementById("budget-list");
  const categorySelect = document.getElementById("budget-category");
  const newCategoryInput = document.getElementById("new-category");
  const addCategoryBtn = document.getElementById("add-category-btn");

  // Load budgets and categories on page load
  renderBudgets();
  renderCategories();

  // Event Add new category
  addCategoryBtn.addEventListener("click", () => {
    const newCategory = newCategoryInput.value.trim();
    if (!newCategory) return;

    let categories = getCategories(); // get from storage.js
    if (!categories.includes(newCategory)) {
      categories.push(newCategory);
      saveCategories(categories); // save back to local storage
      renderCategories();
      newCategoryInput.value = "";
    }
  });

  function renderCategories() {
    const categories = getCategories(); // array of strings
    categorySelect.innerHTML = "";
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  // Event Submit budget form
  form.addEventListener("submit", e => {
    e.preventDefault();

    const category = categorySelect.value; // now from select
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
