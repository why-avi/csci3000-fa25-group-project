// JavaScript file for LocalStorage logic.

/* Transaction format:
id: number
type: string = income || expense
category: string
description: string - optional
date: date
amount: number
*/ 

/* Budget Format:
id: number
category: sync with transaction || create new
limit: number 
description: string
*/

/* Category format: Simple array of strings
 [category, category1, category2]
*/


/* ======================== Getters ======================== */ 

// Each item is stored as an array of objects. Getters return JSON parsed array or empty array.

// Get all transaction objects from localStorage.
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

// Get all budget objects from local storage
function getBudgets() {
    return JSON.parse(localStorage.getItem("budgets")) || [];
}

// Get all categories array
function getCategories() {
    return JSON.parse(localStorage.getItem("categories")) || [];
}


// Returns transaction object located at id index.
function getTransactionById(id) {
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);

    if (index !== -1) {
        return transactions[index];
    } else {
        console.log("ERROR: Transaction ID not found.");
        return;
    }
    // (Tyler) Note: Not sure if this is necessary to have, 
    // most of the time you should be able to accomplish what you need with the returned object in getTransactions.
}

// Returns the budget object at the index found with id.
function getBudgetById(id) {
    const budgets = getBudgets();
    const index = budgets.findIndex(b => b.id === id);

    if (index !== -1) {
        return budgets[index];
    } else {
        console.log("ERROR: Budget ID not found.")
    }
}

/* ======================== Setters ======================== */ 

// Save transactions array to localStorage
function setTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Save budgets array to localStorage
function setBudgets(budgets) {
    localStorage.setItem("budgets", JSON.stringify(budgets));
}

// Save categories array to localStorage, no return value.
function setCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
}

// Adds transaction to transactions array and save to localStorage
function addTransaction(transaction) {
    let transactions = getTransactions();
    transactions.push(transaction);
    setTransactions(transactions);
    
    // Check if category exists
    let categories = getCategories();
    const exists = categories.includes(transaction.category);

    if (!exists) {
        addCategory(transaction.category);
    }
}

// Add budget to budgets array and save to localStorage
function addBudget(budget) {
    let budgets = getBudgets();
    let categories = getCategories();
    const budExists = budgets.some(b => b.category === budget.category);
    const catExists = categories.includes(budget.category);

    if (!budExists) {
        budgets.push();
        setBudgets(budgets);
    }

    if (!catExists) {
        addCategory(budget.category);
    }
}

function addCategory(category) {
    let categories = getCategories();
    categories.push(category);
    setCategories(categories);
}

/* ======================== Mutators ======================== */ 

/* --- Edit functions for transactions, budgets and categories --- */

function editTransaction(id, transaction) {
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
        console.error("ERROR: Transaction ID not found.");
        return;
    }

    const original = transactions[index];
    const updated = Object.assign({}, original, {
        type: transaction.type ?? original.type,
        category: transaction.category ?? original.category,
        description: transaction.description ?? original.description,
        date: transaction.date ?? original.date,
        amount: typeof transaction.amount !== "undefined" ? Number(transaction.amount) : original.amount
    });

    transactions[index] = updated;
    setTransactions(transactions);

    // If category updated, add to categories if it doesn't exist.
    if (updated.category !== original.category) {
        const categories = getCategories();
        if (!categories.includes(updated.category)) 
            addCategory(updated.category);
    }

}

function editBudget(id, budget) {
    const budgets = getBudgets();
    const index = budgets.findIndex(b => b.id === id);

    if (index === -1) {
        console.error("ERROR: Budget ID not found")
        return;
    }

    const original = transactions[index];
    const updated = Object.assign({}, original, {
        category:       budget.category ?? original.category,
        limit:          typeof budget.limit !== "undefined" ? Number(budget.amount) : original.amount,
        description:    budget.description ?? original.description
    });

    budgets[index] = updated;
    setBudgets(budgets);

    // If category updated, add to categories if it doesn't exist.
    if (updated.category !== original.category) {
        const categories = getCategories();
        if (!categories.includes(updated.category)) 
                addCategory(updated.category);
    }

}

function editCategory(category) {
    const transactions = getTransactions();
    const budgets = getBudgets();
    let categories = getCategories();

    // Check that new name doesn't exist
    const exists = categories.some(c => c === category); 
    if (exists) {
        console.error("Category name already exists.");
        return;
    }

    // Rename budget for this category
    const budIndex = budgets.findIndex(b => b.category === category); 
    if (budIndex !== -1) {
        budgets[budIndex].category = category;
    } 

    // Renaame category for transactions
    transactions.array.forEach(t => {
        if (t.category === category) {
                t.category = category;
        }
    });
    // Save category
    const index = categories.findIndex(c = c === category);
    if (index !== -1) {
        categories[index] = category;
        setCategories(categories);
    }
}


/* --- Delete Functions for transactions, budgets, and categories --- */

function deleteTransaction(id) {
    const transactions = getTransactions();

    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    
}

function deleteBudget(id) {
    const budgets = getBudgets();

    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
}

function deleteCategory(category) {
    const categories = getCategories();
    let transactions = getTransactions();
    const budgets = getBudgets();

    // Check that category doesn't have budget
    const hasBudget = budgets.some(b => budget.category === category);
    if (hasBudget) {
        // Error out for now. Add confirmation prompt later
        console.error("Can't delete category with a budget");
        return;
    }

    // Rename transactions with category to undefined
    transactions.array.forEach(t => {
        if (t.category === category) {
            t.category = "none";
        }
    });
    setTransactions(transactions);

    // Remove category
    let updated = categories.filter(c => c === category);
    setCategories(updated);

}


/* ======================== Helpers ======================== */

// Check if category exists



// Function to detect whether localStorage is both supported and available. Source: developer.mozilla.org
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test_";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored. 
            // (Ensures that space has been used rather than the browser just returning a quota of zero - TS)
            storage &&
            storage.lenght !== 0
        );
    }
}

/* Code for for using storageAvailable: (Source: developer.mozilla.org)
 if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
} else {
  // Too bad, no localStorage for us
}
*/