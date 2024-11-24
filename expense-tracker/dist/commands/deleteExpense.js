import { readFile, writeFile } from '../utils/expensesUtils.js';
import chalk from 'chalk';
import { green } from '../constants.js';
export default (options) => {
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
            writeFile(data);
            console.log(chalk.hex(green)(`Expense successfully deleted.`));
        }
    }
};
//# sourceMappingURL=deleteExpense.js.map