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
{"name": "Entertainment", "value":"Entertainment"}]`;
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
                parsedCategories.push({ "name": "Previous", "value": "Previous" });
                const category = yield select({
                    message: 'Browse possible categories',
                    choices: parsedCategories
                });
                if (category !== "Previous") {
                    data = readFile();
                    data[data.length - 1].category = category;
                    jsonData = JSON.stringify(data);
                    writeFile();
                    console.log(`\nCategory ${chalk.hex(green)(`"${category}"`)} assigned to ID ${data.length}.`);
                }
                else {
                    addCategory();
                }
            }
            else if (answer === 2) {
                const category = yield input({ message: 'Enter the name of the new category:' });
                data = readFile();
                let categoryToUppercase = category.slice(0, 1).toUpperCase() + category.slice(1, category.length).toLowerCase();
                let parsedCategories = readCategories();
                let availableCategories = parsedCategories.find((categories) => categoryToUppercase === categories.name);
                if (availableCategories === undefined) {
                    data[data.length - 1].category = categoryToUppercase;
                    jsonData = JSON.stringify(data);
                    writeFile();
                    parsedCategories.push({ "name": data[data.length - 1].category, "value": data[data.length - 1].category });
                    categoriesData = JSON.stringify(parsedCategories);
                    writeCategories();
                    console.log(`\nCategory ${chalk.hex(green)(`"${categoryToUppercase}"`)} created and assigned to ID ${data.length}.`);
                }
                else {
                    console.error(chalk.red(`\nError: category "${categoryToUppercase}" already exists\n`));
                    addCategory();
                }
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
    .description('update an expense with either a new description or amount')
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
            function updateCategory() {
                return __awaiter(this, void 0, void 0, function* () {
                    const answer = yield select({
                        message: `Would you like to update the category for this expense? (category: ${(updateExpense === null || updateExpense === void 0 ? void 0 : updateExpense.category) === "" ? "no category assigned" : updateExpense === null || updateExpense === void 0 ? void 0 : updateExpense.category})`,
                        choices: [{ name: 'Keep the current category', value: 1 },
                            { name: 'Choose a different category', value: 2 },
                            { name: 'Create a new category', value: 3 },
                            { name: 'Remove category', value: 4 },
                        ]
                    });
                    if (answer === 1) {
                        return;
                    }
                    else if (answer === 2) {
                        let parsedCategories = readCategories();
                        parsedCategories.push({ "name": "Previous", "value": "Previous" });
                        const category = yield select({
                            message: 'Browse possible categories',
                            choices: parsedCategories
                        });
                        if (category !== "Previous") {
                            data = readFile();
                            data[options.id - 1].category = category;
                            jsonData = JSON.stringify(data);
                            writeFile();
                            console.log(`\nCategory ${chalk.hex(green)(`"${category}"`)} assigned to ID ${options.id}.`);
                        }
                        else {
                            updateCategory();
                        }
                    }
                    else if (answer === 3) {
                        const category = yield input({ message: 'Enter the name of the new category:' });
                        data = readFile();
                        let parsedCategories = readCategories();
                        let categoryToUppercase = category.slice(0, 1).toUpperCase() + category.slice(1, category.length).toLowerCase();
                        let availableCategories = parsedCategories.find((categories) => categoryToUppercase === categories.name);
                        if (availableCategories === undefined) {
                            data[options.id - 1].category = categoryToUppercase;
                            jsonData = JSON.stringify(data);
                            writeFile();
                            parsedCategories.push({ "name": data[options.id - 1].category, "value": data[options.id - 1].category });
                            categoriesData = JSON.stringify(parsedCategories);
                            writeCategories();
                            console.log(`\nCategory ${chalk.hex(green)(`"${categoryToUppercase}"`)} created and assigned to ID ${options.id}.`);
                        }
                        else {
                            console.error(chalk.red(`\nError: category "${categoryToUppercase}" already exists\n`));
                            updateCategory();
                        }
                    }
                    else {
                        data = readFile();
                        let removeCategory = data.find((properties) => properties.id === options.id);
                        let previousCategory = removeCategory === null || removeCategory === void 0 ? void 0 : removeCategory.category;
                        if (removeCategory) {
                            removeCategory.category = "";
                        }
                        jsonData = JSON.stringify(data);
                        writeFile();
                        console.log(`\n${previousCategory === "" ? `${chalk.red(`ID ${options.id} is not assigned to a category`)}` : `ID ${options.id} removed from category ${chalk.hex(green)(`"${previousCategory}"`)}`}`);
                    }
                });
            }
            updateCategory();
        }
    }
    if (!updateExpense) {
        console.error(`${chalk.red(`Error: ID does not exist (ID: ${options.id})\n`)}Run 'expense-tracker list' to view recorded expenses and their corresponding IDSs`);
    }
})
    .showHelpAfterError(chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30"));
program
    .command('category')
    .requiredOption('--delete <name>', 'name of category to be deleted')
    .description('delete an existing category')
    .action((options) => {
    let data = readFile();
    let categoryToUppercase = options.delete.slice(0, 1).toUpperCase() + options.delete.slice(1, options.delete.length).toLowerCase();
    let categoriesJson = readCategories();
    let deleteCategories = categoriesJson.findIndex((categories) => categories.name === categoryToUppercase);
    if (options.delete !== "") {
        if (deleteCategories !== -1) {
            categoriesJson.splice(deleteCategories, 1);
            let categories = data.filter((properties) => properties.category === categoryToUppercase);
            if (categories.length !== 0) {
                for (let i = 0; i < categories.length; i = i + 1) {
                    categories[i].category = "";
                    console.log(`ID ${categories[i].id} unassigned from category ${chalk.hex(green)(`"${categoryToUppercase}"`)}`);
                }
            }
            categoriesData = JSON.stringify(categoriesJson);
            jsonData = JSON.stringify(data);
            writeFile();
            writeCategories();
            console.log(`Category ${chalk.hex(green)(`"${categoryToUppercase}"`)} deleted successfully.`);
        }
        else {
            console.error(`${chalk.red(`Error: category "${categoryToUppercase}" does not exist\n`)}Run 'expense-tracker category-list' to view existing categories`);
        }
    }
    else {
        console.error(`${chalk.red(`Error: no category entered\n`)}Sample: expense-tracker category --delete 'Food'`);
    }
})
    .showHelpAfterError(chalk("Sample: expense-tracker category --delete 'Food'"));
program
    .command('delete')
    .requiredOption('--id <id>', 'id of expense to be deleted', Number)
    .description('delete an expense')
    .action((options) => {
    let data = readFile();
    if (isNaN(options.id)) {
        console.error(chalk.red("Error: ID must be a number"));
        console.error((chalk("Sample: expense-tracker delete --id 1")));
        return;
    }
    else {
        if (data.length < options.id) {
            console.error(`${chalk.red(`Error: ID does not exist (ID: ${options.id})\n`)}Run 'expense-tracker list' to view recorded expenses and their corresponding IDSs`);
        }
        else {
            data.splice(options.id - 1, 1);
            for (let i = 1; i <= data.length; i = i + 1) {
                data[i - 1].id = i;
            }
            jsonData = JSON.stringify(data);
            writeFile();
            console.log(chalk.hex(green)(`Expense successfully deleted.`));
        }
    }
})
    .showHelpAfterError(chalk("Sample: expense-tracker delete --id 1"));
program.configureOutput({
    writeErr: (str) => {
        str = str.replace('error:', chalk.red('Error: '));
        process.stderr.write(str);
    }
});
program
    .parse(process.argv);
//# sourceMappingURL=index.js.map