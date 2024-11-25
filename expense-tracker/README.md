# Expense Tracker CLI

**Expense Tracker** is a command-line application for managing personal expenses. It allows users to add, update, delete, and list expenses, categorize them, set a default currency, and export expenses to a csv file.

## Features

- **Add Expenses**: Record expenses with a description, amount, category, and date.
- **Update Expenses**: Modify expense details, including the amount, description, and category.
- **Delete Expenses**: Remove specific expenses by ID.
- **List Expenses**: View expenses filtered by year, month, category, or a combination of these.
- **Manage Categories**: Add, delete, and view categories for organizing expenses.
- **Change Currency**: Set a preferred currency for tracking expenses.
- **Export Expenses**: Export expenses to a csv file.

## Installation
### Clone the repository

   ```bash
   git clone https://github.com/noneofurbuzz/backend_projects.git
   
   # navigate to the project directory
   cd backend_projects/expense-tracker
   ```

### Install dependencies
   ```bash
   npm install
   ```
### Build the project

```bash
npm run build
```

### Link globally
   ```bash
   npm link
   ```

## Usage

### Commands

1. **Add an Expense**
   ```bash
   expense-tracker add --description <description> --amount <amount>
   ```
   Example:
   ```bash
   expense-tracker add --description "Lunch" --amount 20
   ```

   After adding an expense, you'll have the option to assign a category.

2. **Update an Expense**
   ```bash
   expense-tracker update --id <id> --description <description> --amount <amount>

   # --description or --amount options are not required
   ```
   Example:
   ```bash
   expense-tracker update --id 1 --description "Breakfast" --amount 15
   ```

3. **Delete an Expense**
   ```bash
   expense-tracker delete --id <id>
   ```
   Example:
   ```bash
   expense-tracker delete --id 1
   ```

4. **List Expenses**
   ```bash
   expense-tracker list --year <year>

   # --year option is not required
   
   ```
   Example:
   ```bash
   expense-tracker list --year 2024
   ```

5. **List Categories**
   ```bash
   expense-tracker category-list
   ```

6. **Delete a Category**
   ```bash
   expense-tracker category --delete <name>
   ```
   Example:
   ```bash
   expense-tracker category --delete "Food"
   ```

7. **Change Currency**
   ```bash
   expense-tracker currency
   ```

8. **Export to CSV File**
    ```bash
    expense-tracker export 'expenses.csv'
