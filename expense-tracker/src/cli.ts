import add from './commands/add.js';
import update from './commands/update.js';
import chalk from 'chalk'
import { program } from '@commander-js/extra-typings';
import deleteCategory from './commands/deleteCategory.js';
import deleteExpense from './commands/deleteExpense.js';
import listExpenses from './commands/listExpenses.js';
import catogoryList from './commands/catogory-list.js';
import currency from './commands/currency.js';
import exportToCSV from './commands/exportToCSV.js';

program
    .name('expense-tracker')
    .description('track your expenses')
    .version('1.0.0')
program
    .command('add')
    .requiredOption('--description <description>','description of an expense')
    .requiredOption('--amount <amount>','amount of an expense',Number)
    .description('add an expense with a description and amount')
    .action((options) => add(options))
    .showHelpAfterError(chalk("Sample: expense-tracker add --description 'Lunch' --amount 20"))
program
    .command('update')
    .requiredOption('--id <id>','id of an expense',Number)
    .option('--description <description>','description of an expense')
    .option('--amount <amount>','amount of an expense',Number)
    .description('update an expense with either a new description or amount')
    .action((options) => update(options))
    .showHelpAfterError(chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30"))
program
    .command('category')
    .requiredOption('--delete <name>','name of category to be deleted')
    .description('delete an existing category')
    .action((options: {delete:string}) => {deleteCategory(options)})
    .showHelpAfterError(chalk("Sample: expense-tracker category --delete 'Food'"))
program
    .command('delete')
    .requiredOption('--id <id>', 'id of expense to be deleted',Number)
    .description('delete an expense')
    .action((option)=> {deleteExpense(option)})
    .showHelpAfterError(chalk("Sample: expense-tracker delete --id 1"))
program
    .command('list')
    .description('list expenses')
    .option('--year <year>','the specific year to get the list of expenses')
    .action((option)=>{listExpenses(option)})
    .showHelpAfterError(chalk(`Sample: expense-tracker list --year ${new Date().getFullYear()}`))
program
    .command('summary')
    .description('list total summary of expenses')
    .option('--year <year>','the specific year to get the list of expenses')
    .action((option)=>{listExpenses(option)})
    .showHelpAfterError(chalk(`Sample: expense-tracker summary --year ${new Date().getFullYear()}`))
program
    .command('category-list')
    .description('list categories')
    .action(() => {catogoryList()})
    .showHelpAfterError(`Sample: expense-tracker category-list`)
program
    .command('currency')
    .description('change currency')
    .action(() => {currency()})
program
    .command('export <file_path>')
    .description('export to a csv file')
    .action((file_path) => exportToCSV(file_path))
    .showHelpAfterError(`Sample: expense-tracker export expenses.csv`)
program.configureOutput({
    writeErr: (str) => {
        str = str.replace('error:',chalk.red('Error: '))
        process.stderr.write(str)
    }
})

export function cli(){
program
    .parse(process.argv)
}
