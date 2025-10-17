# UNG CSCI 3000 - Web Programming Fall Group Project
Group members: Clark Serecky, Jack Ellis, Tomas Karounas, Tyler Stanton

# Budget Tracker Website
This web programming group project will create a budget tracking website. Users will be able to input income and expenses, create budgets for categories that track expenses, and view transaction history with a running balance.

## Planned Features
1. Transactions
    - Transaction Form
        - Type: Income or Expense
        - Cetegory
        - Description
        - Date
        - Amount
    - Transaction Table
        - Displays all recorded income and expenses.
        - Columns: Type, Category, Description, Date, Amount, Actions
    - Edit/Delete Transactions
2. Budget Management
    - Budget Form: Create a budget for a category of spending.
        - Fields: Category, Spending Limit, Description.
        - Recommendations/Templates
    - Budget Table: Displays existing budgets and spending progress
3. Reports
    - Report table: Combines information from all income, expenses and budgets.
    - Total income, expenses. Running total.
    - Budget progress summaries
4. Dashboard
    - Styled homepage with cards that displays summarizing information:
    - Current balance, number of transactions, budgets near limit, recent activiy.

### Page breakdown
- **Homepage** index.html: Contains intro to website, navigation and dashboard.
- **Transaction page** transactions.html: Contains transaction form and table, allows adding, deleting and editing of transactions.
- **Budget page** budget.html: contains budget form and table.
- **Reports page** report.html: contains report table.

### Team Assignments
We are spreading the work acroos the team by page. Each team member has one page they are assigned:
- Tyler Stanton: Homepage/Dashboard, maintain CSS and documentation.
- Jack Ellis: Transactions page
- Tomas Karounas: Budgets page
- Clark Serecky: Reports page

## Project Details
One HTML file for each page. One common CSS and JS file to be reuesed across all pages. Use JS **LocalStorage** to save data in browser usable acrosss pages that persists.