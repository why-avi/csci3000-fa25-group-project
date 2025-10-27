<!DOCTYPE html>
<html lang="en">
    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transactions | Budget Tracker</title>
  <style>
    body {
        font-family: Arial, sans-serif;
        margin: 2rem
    }
    header {
        margin-bottom: 2rem
    }
    nav a {
        margin-right: 1rem;
    }
    form {
        border: 1px solid #ccc
        padding: 1rem
        border-radius: 6px
        width: 350px
    }
    input, select {
        width: 100%
        padding:0.5rem
        margin: 0.3rem 0 
    }
    button {
        margin-top: 0.5rem
        padding: 0.5rem 1rem
        cursor:pointer
    }
    table {
        margin-top: 2rem;
        width: 100%
        border-collapse: collapse 
    }
    th, td {
        border: 1px solid #ddd
        padding: 0.5rem
        text-align: left
    }
    th {
        background: #f0f0f0
    }
    .actions button {
        margin-right: 0.3rem
    }
  </style>
    </head>
<body>
    <header>
        <h1>Budget Tracker</h1>
        <nav>
      <a href="index.html">Home</a> |
      <a href="transactions.html">Transactions</a> |
      <a href="budgets.html">Budgets</a> |
      <a href="reports.html">Reports</a>
    </nav>
    </header>
    <main>
        <h2>Add a transaction</h2>
        <!-- Form for the transactions -->
        <form id = "transactionForm">
            <label for = "type">Type:</label>
            <select id="type" required>
                <option value="">--Select--</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        </select>
        <br><br>

        <label for="category">Category</label>
        <input type="text" id="category" placeholder="ex. Groceries, Fun, Utilities" required/>
        <br><br>

        <label for="description">Description</label>
        <input type="text" id="description" placeholder="Specifics" required/>
        <br><br>

        <label for="date">Transaction Date</label>
        <input type="date" id="date" required/>
        <br><br>

        <label for="amount">Amount of $</label>
        <input type="number" id="amount" step="0.01" required/>
        <br><br>

        <button type="submit">Add Transaction</button>
        </form> 

        <hr>

        <h3>Transaction History: </h3>
        <!--Table -->
        <table border="1" id="transactionTable">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Amount ($)</th>
                </tr>
            </thead>
            <tbody>
                <!--Transactions will appear here-->
            </tbody>
        </table>
        <h3>Current Balance: $<span id="balance">0.00</span></h3>
    </main>

    <script>
        // Getters and Setters for Local Storage 
        /* Retrieves the array of transaction data from localStorage
            if no transaction data is avalible: returns an empty array
        */
        function getTransactions(){
            const data = localStorage.getItem("transactions")
            return data ? JSON.parse(data) : []
        }
        /* Saves transaction data to localStorage
            turns the array into a JSON object before storing it 
        */
        function setTransactions(transactions){
            localStorage.setItem("transactions", JSON.stringify(transactions))
        }
        /* Adds a single transaction to the exsisting list of transactions in localStorage
            retrieves the current array, appeneds the new data, saves the updated array
        */
        function addTransaction(transaction){
            const transactions = getTransactions()
            transactions.push(transaction)
            setTransactions(transactions)
        }
        /* removes a transaction from localStorage by ID
            Filters out transactions by ID and saves the remaining array
        */
        function deleteTransaction(id){
            const transactions = getTransactions().filter(t => t.id !== id)
            setTransactions(transactions)
        }
        /* Updates exsisting transaction data in localStorage
            searches for data by ID, then replaces the old data with the new object data
        */
        function editTransaction(id, newData){
            const transactions = getTransactions().map(t => t.id === id ? {...t, ...newData} : t)
            setTransactions(transactions)
        }
    </script>
</body>
</html>
