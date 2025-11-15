// DOM and Event Logic
        const form = document.getElementById("transactionForm")
        const tableBody = document.getElementById("transactionTableBody")
        //Load all transactions 
        function loadTransactions() {
            const transactions = getTransactions()
            tableBody.innerHTML = ""

            if (transactions.length === 0 ){
                tableBody.innerHTML = "<tr><td colspan='6'>No transactions yet.</td></tr>"
                return
            }
            transactions.forEach(t => {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${t.type}</td>
                    <td>${t.category}</td>
                    <td>${t.description || "-"}</td>
                    <td>${t.date}</td>
                    <td>$${t.amount.toFixed(2)}</td>
                    <td class="actions">
                    <button class="editButton" onclick="handleEdit(${t.id})">Edit</button>
                    <button class="deleteButton" onclick="handleDelete(${t.id})">Delete</button>
                    </td>
                    `
                tableBody.appendChild(row)
            });
        }
        function handleDelete(id){
            if(confirm("Delete this transaction?")){
                deleteTransaction(id)
                loadTransactions()
            }
        }

        function submitHandler(event) {
            event.preventDefault()
            const type = document.getElementById("type").value
            const category = document.getElementById("category").value.trim()
            const description = document.getElementById("description").value.trim()
            const date = document.getElementById("date").value
            const amount = parseFloat(document.getElementById("amount").value)

            if(!category || isNaN(amount) || !date){
                alert("Please fill out all required fields.")
                return
            }

            const transaction = {
                id: Date.now(),
                type,
                category,
                description,
                date,
                amount
            }

            addTransaction(transaction)
            form.reset()
            loadTransactions() // updates the table instantly
        }
        function handleEdit(id){
            const transactions = getTransactions()
            const transaction = transactions.find(t => t.id === id)
            if(!transaction) return

            document.getElementById("type").value = transaction.type
            document.getElementById("category").value = transaction.category;
            document.getElementById("description").value = transaction.description;
            document.getElementById("date").value = transaction.date;
            document.getElementById("amount").value = transaction.amount;

            //Temporarly remove submit handler 
            form.removeEventListener("submit", submitHandler)
            form.onsubmit = function(event){
                event.preventDefault()
                transaction.type = document.getElementById("type").value
                transaction.category = document.getElementById("category").value.trim()
                transaction.description = document.getElementById("description").value.trim()
                transaction.date = document.getElementById("date").value
                transaction.amount = parseFloat(document.getElementById("amount").value)
                editTransaction(id, transaction)
                form.reset()
                loadTransactions()
                form.onsubmit = null
                form.addEventListener("submit", submitHandler)
            }
        }
        form.addEventListener("submit", submitHandler)
        document.addEventListener("DOMContentLoaded", loadTransactions)
