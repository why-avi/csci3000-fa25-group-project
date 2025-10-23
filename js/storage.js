// JavaScript file for LocalStorage logic.

/*
Transaction format:
id: number
type: string = income || expense
category: string
description: string - optional
date: date
amount: number
*/ 

/*
Budget Format:
id: number
category: sync with transaction || create new
limit: number 
description: string
*/


/* ======================== Getters ======================== */ 

// Get all transaction objects from localStorage.
function getTransactions() {
    //TODO: return parsed JSON array of objects. returns array.
}

// Get all budget objects from local storage
function getBudgets() {
    // TODO: Return parsed JSON array of budget objects. returns array
}

// TODO: Functions to find budget and transaction arrays by id.

function getTransaction(id) {
    // TODO
}

function getBudget(id) {
    // TODO
}

/* ======================== Setters ======================== */ 

// Save transactions array to localStorage
function setTransactions(transactions) {
    // TODO: Save transaction object array to localStorage. No return value.
}

// Save budgets array to localStorage
function setBudgets(budgets) {
    // TODO: Save budget object array to localStorage. No return value.
}

// Adds transaction to transactions array and save to localStorage
function addTransaction(transaction) {
    let transactions = getTransactions();
    
    // TODO: add transaction to object array and save to localStorage, no return value.
}

// Add budget to budgets array and save to localStorage
function addBudget(budget) {
    // TODO: Add budget to object array and save to localStorage, no return value.
}

/* ======================== Mutators ======================== */ 


// Updates a transaction to have new data.
function editTransaction(id, transaction) {
    //TODO: Search by id, set original transaction values to new values, save to localStorage. no return value.

}

// Update a budget to have new data.
function editBudget(id, budget) {
    // TODO: Search by id, set original budget values to new values, save to localStorage, no return value.
}

// Deletes a transaction from localStorage by id
function deleteTransaction(id) {
    let transactions = getTransactions();
    // TODO: find transaction according to id and remove from array and save to localstorage, no return value.
}

// Deletes a budget from localStorage by id
function deleteBudget(id) {
    // TOOD: find budget by id, remove from object array, save arry to localStorage, no return value
}


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