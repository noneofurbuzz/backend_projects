#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import { readFile, writeFile } from './utils/expensesUtils.js';
import add from './commands/add.js';
import update from './commands/update.js';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import { program } from '@commander-js/extra-typings';
import deleteCategory from './commands/deleteCategory.js';
import deleteExpense from './commands/deleteExpense.js';
import listExpenses from './commands/listExpenses.js';
let categoriesData = `[{"name": "Food", "value":"Food"},
{"name": "Transport", "value":"Transport"},
{"name": "Entertainment", "value":"Entertainment"}]`;
function writeCategories() {
    fs.writeFile('categories.json', categoriesData, (err) => {
        if (err)
            throw err;
    });
}
function readCategories() {
    if (fs.existsSync('categories.json')) {
        let categories = fs.readFileSync('categories.json', 'utf-8');
        return JSON.parse(categories);
    }
    else {
        writeCategories();
        return JSON.parse(categoriesData);
    }
}
function readCurrency() {
    let currency = fs.readFileSync('currency.json', 'utf-8');
    return JSON.parse(currency);
}
program
    .name('expense-tracker')
    .description('track your expenses')
    .version('1.0.0');
program
    .command('add')
    .requiredOption('--description <description>', 'description of an expense')
    .requiredOption('--amount <amount>', 'amount of an expense', Number)
    .description('add an expense with a description and amount')
    .action((options) => add(options))
    .showHelpAfterError(chalk("Sample: expense-tracker add --description 'Lunch' --amount 20"));
program
    .command('update')
    .requiredOption('--id <id>', 'id of an expense', Number)
    .option('--description <description>', 'description of an expense')
    .option('--amount <amount>', 'amount of an expense', Number)
    .description('update an expense with either a new description or amount')
    .action((options) => update(options))
    .showHelpAfterError(chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30"));
program
    .command('category')
    .requiredOption('--delete <name>', 'name of category to be deleted')
    .description('delete an existing category')
    .action((options) => { deleteCategory(options); })
    .showHelpAfterError(chalk("Sample: expense-tracker category --delete 'Food'"));
program
    .command('delete')
    .requiredOption('--id <id>', 'id of expense to be deleted', Number)
    .description('delete an expense')
    .action((option) => { deleteExpense(option); })
    .showHelpAfterError(chalk("Sample: expense-tracker delete --id 1"));
program
    .command('list')
    .description('list expenses')
    .option('--year <year>', 'the specific year to get the list of expenses')
    .action((option) => { listExpenses(option); })
    .showHelpAfterError(chalk(`Sample: expense-tracker list --year ${new Date().getFullYear()}`));
program
    .command('summary')
    .description('list total summary of expenses')
    .option('--year <year>', 'the specific year to get the list of expenses')
    .action((option) => { listExpenses(option); })
    .showHelpAfterError(chalk(`Sample: expense-tracker summary --year ${new Date().getFullYear()}`));
program
    .command('category-list')
    .description('list categories')
    .action(() => {
    let parsedCategories = readCategories();
    if (parsedCategories.length !== 0) {
        console.log('Existing categories: ');
        for (let i = 0; i < parsedCategories.length; i = i + 1) {
            console.log(`${i + 1}. ${parsedCategories[i].name}`);
        }
    }
    else {
        console.error('No categories exist');
    }
})
    .showHelpAfterError(`Sample: expense-tracker category-list`);
program
    .command('currency')
    .description('change currency')
    .action(() => {
    function currency() {
        return __awaiter(this, void 0, void 0, function* () {
            let currencyData = readCurrency();
            let data = readFile();
            const baseCurrency = yield select({
                message: "Choose your currency",
                choices: currencyData,
            });
            for (let i = 0; i < data.length; i = i + 1) {
                data[i].currency = baseCurrency;
            }
            writeFile(data);
        });
    }
    currency();
});
program.configureOutput({
    writeErr: (str) => {
        str = str.replace('error:', chalk.red('Error: '));
        process.stderr.write(str);
    }
});
program
    .parse(process.argv);
//# sourceMappingURL=index.js.map