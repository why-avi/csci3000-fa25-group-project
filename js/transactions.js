// DOM and Event Logic
        const form = document.getElementById("transactionForm")
        const tableBody = document.getElementById("transactionTableBody")
        const balanceEL = document.getElementById("balance")
        const categorySelect = document.getElementById("category")
        //Categories
        function loadCategories(){
            let categories = getCategories()

            //clear exsisting
            categorySelect.innerHTML = ""

            //placeholder
            const placeholder = document.createElement("option")
            placeholder.value = ""
            placeholder.textContent = "--Select Category--"
            placeholder.disabled = true
            placeholder.selected = true
            categorySelect.appendChild(placeholder)
            //add categories from storage
            categories.forEach(cat => {
                const option = document.createElement("option")
                option.value = cat
                option.textContent = cat
                categorySelect.appendChild(option)
            })

            const addNew = document.createElement("option")
            addNew.value = "__add_new__"
            addNew.textContent = "Add new category..."
            categorySelect.appendChild(addNew)
        }
          

        categorySelect.addEventListener("change", ()=> {
            if (categorySelect.value === "__add_new__") {
                const newCat = prompt("Enter new category name:")
                if (newCat && newCat.trim() !== "") {
                    addCategory(newCat.trim())
                    loadCategories()
                    categorySelect.value = newCat.trim()
                } else {
                    categorySelect.value = "" // Reset
                }
            }
        })

        function loadTransactions() {
            const transactions = getTransactions()
            tableBody.innerHTML = ""

            if (transactions.length === 0 ){
                tableBody.innerHTML = "<tr><td colspan='6'>No transactions yet.</td></tr>"
                updateBalance()
                return;
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
                updateBalance()
        }

        //update balance function 
        function updateBalance(){
            const transactions = getTransactions()
            let balance = 0

            transactions.forEach(t => {
                balance += t.type === "income" ? t.amount : -t.amount;
            })
            balanceEL.textContent = balance.toFixed(2)
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
        document.addEventListener("DOMContentLoaded", () => {
            loadCategories()
            loadTransactions()
        })
