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
import chalk from 'chalk';
import { select, input } from '@inquirer/prompts';
import { program } from '@commander-js/extra-typings';
let jsonData = "[]";
let categoriesData = `[{"name": "Food", "value":"Food"},
{"name": "Transport", "value":"Transport"},
{"name": "Entertainment", "value":"Entertainment"},
{"name": "Previous", "value":"Previous"}]`;
const green = '#4bb543';
function writeFile() {
    fs.writeFile('expenses.json', jsonData, (err) => {
        if (err)
            throw err;
    });
}
function readFile() {
    if (fs.existsSync('expenses.json')) {
        let data = fs.readFileSync('expenses.json', 'utf-8');
        return JSON.parse(data);
    }
    else {
        writeFile();
        return JSON.parse(jsonData);
    }
}
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
program
    .name('expense-tracker')
    .description('track your expenses')
    .version('1.0.0');
program
    .command('add')
    .requiredOption('--description <description>', 'description of an expense')
    .requiredOption('--amount <amount>', 'amount of an expense', Number)
    .description('add an expense with a description and amount')
    .action((options) => {
    let data = readFile();
    if (isNaN(options.amount)) {
        console.error(chalk.red("Error: amount must be a number"));
        console.error((chalk("Sample: expense-tracker add --description 'Lunch' --amount 20")));
        return;
    }
    data.push({
        id: data.length + 1,
        description: options.description,
        amount: options.amount,
        date: new Date().toISOString().slice(0, 10),
        category: ""
    });
    jsonData = JSON.stringify(data);
    writeFile();
    console.log(chalk.hex(green)(`Expense added successfully (ID: ${data.length})\n`));
    function addCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield select({
                message: 'This expense has no category assigned. Would you like to assign one now?',
                choices: [
                    { name: 'Choose from possible categories', value: 1 },
                    { name: 'Create a new category', value: 2 },
                    { name: 'Skip', value: 3 },
                ]
            });
            if (answer === 1) {
                let parsedCategories = readCategories();
                const category = yield select({
                    message: 'Browse possible categories',
                    choices: parsedCategories
                });
                if (category !== "Previous") {
                    data = readFile();
                    data[data.length - 1].category = category;
                    jsonData = JSON.stringify(data);
                    writeFile();
                    console.log(`\nCategory ${chalk.hex(green)(`"${category}"`)} created and assigned to ID ${data.length}.`);
                }
                else {
                    addCategory();
                }
            }
            else if (answer === 2) {
                const category = yield input({ message: 'Enter the name of the new category:' });
                data = readFile();
                data[data.length - 1].category = category.slice(0, 1).toUpperCase() + category.slice(1, category.length).toLowerCase();
                jsonData = JSON.stringify(data);
                writeFile();
                let parsedCategories = readCategories();
                parsedCategories.splice(parsedCategories.length - 1, 0, { "name": data[data.length - 1].category, "value": data[data.length - 1].category });
                categoriesData = JSON.stringify(parsedCategories);
                writeCategories();
                console.log(`\nCategory ${chalk.hex(green)(`"${data[data.length - 1].category}"`)} created and assigned to ID ${data.length}.`);
            }
            else {
                return;
            }
        });
    }
    addCategory();
})
    .showHelpAfterError(chalk("Sample: expense-tracker add --description 'Lunch' --amount 20"));
program
    .command('update')
    .requiredOption('--id <id>', 'id of an expense', Number)
    .option('--description <description>', 'description of an expense')
    .option('--amount <amount>', 'amount of an expense', Number)
    .action((options) => {
    let data = readFile();
    if (isNaN(options.id)) {
        console.error(chalk.red("Error: ID must be a number"));
        console.error((chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30")));
        return;
    }
    if (options.amount !== undefined && isNaN(options.amount)) {
        console.error(chalk.red("Error: amount must be a number"));
        console.error(chalk("Sample: expense-tracker update --id 1 --amount 30"));
        return;
    }
    let updateExpense = data.find((properties) => properties.id === options.id);
    if (updateExpense !== undefined) {
        if (options.description !== undefined) {
            updateExpense.description = options.description;
        }
        if (options.amount !== undefined) {
            updateExpense.amount = options.amount;
        }
        if (options.description === undefined && options.amount === undefined) {
            console.error(chalk.red('Error: must include either a description or amount to be updated'));
            console.error((chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30")));
        }
        else {
            jsonData = JSON.stringify(data);
            writeFile();
            console.log(chalk.hex(green)(`Expense updated successfully (ID: ${options.id})`));
        }
    }
    if (!updateExpense) {
        console.error(chalk.red(`Error: ID does not exist (ID: ${options.id})\nRun 'expense-tracker list' to view recorded expenses and their corresponding IDs`));
    }
})
    .configureOutput({ outputError(str, write) {
        if (str.startsWith("error: option '--id <id>' argument missing") || str.startsWith("error: required option '--id <id>' not specified")) {
            write(chalk.red("Error: missing ID\nRun 'expense-tracker list' to view recorded expenses and their corresponding IDs"));
        }
        else {
            write(str);
        }
    } })
    .showHelpAfterError(chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30"));
program.configureOutput({
    outputError(str, write) {
        if (str.startsWith("error: option '--description <description>' argument missing") || str.startsWith("error: option '--amount <amount>' argument missing") || str.startsWith("error: required option '--amount <amount>' not specified") || str.startsWith("error: required option '--description <description>' not specified")) {
            write(chalk.red('Error: missing description or amount\n'));
        }
        else {
            write(str);
        }
    }
});
program
    .parse(process.argv);
//# sourceMappingURL=index.js.map