var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile, writeFile } from '../utils/expensesUtils.js';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import { green } from '../constants.js';
import { browsePossibleCategories } from '../utils/browsePossibleCategories.js';
import { createNewCategory } from '../utils/createNewCategory.js';
export default (options) => {
    let data = readFile();
    if (isNaN(options.amount)) {
        console.error(chalk.red("Error: amount must be a number"));
        console.error((chalk("Sample: expense-tracker add --description 'Lunch' --amount 20")));
        return;
    }
    if (options.description.trim() === "") {
        console.error(chalk.red("Error: description cannot be empty"));
        return;
    }
    data.push({
        id: data.length + 1,
        description: options.description,
        amount: options.amount,
        date: new Date().toISOString().slice(0, 10),
        category: "-",
        currency: data.length === 0 ? " " : data[0].currency
    });
    writeFile(data);
    console.log(chalk.hex(green)(`Expense added successfully (ID: ${data.length}, Amount: ${data[0].currency === " " ? "$" : data[0].currency}${options.amount}, Description: ${options.description})\n`));
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
                browsePossibleCategories(data.length, addCategory);
            }
            else if (answer === 2) {
                createNewCategory(data.length, addCategory);
            }
            else {
                data[0].currency === " " ? console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`) : console.log("");
                return;
            }
        });
    }
    addCategory();
};
//# sourceMappingURL=add.js.map