var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readCategories, writeCategories } from "./categoriesUtils.js";
import { writeFile, readFile } from "./expensesUtils.js";
import { green } from "../constants.js";
import chalk from "chalk";
import { input } from "@inquirer/prompts";
export function createNewCategory(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield input({ message: 'Enter the name of the new category:' });
        let data = readFile();
        if (category !== "" && category.trim() !== "") {
            let categoryToUppercase = category.slice(0, 1).toUpperCase() + category.slice(1, category.length).toLowerCase();
            let parsedCategories = readCategories();
            let availableCategories = parsedCategories.find((categories) => categoryToUppercase === categories.name);
            if (availableCategories === undefined) {
                data[id - 1].category = categoryToUppercase;
                writeFile(data);
                parsedCategories.push({ "name": data[id - 1].category, "value": data[id - 1].category });
                writeCategories(parsedCategories);
                console.log(`\nCategory ${chalk.hex(green)(`"${categoryToUppercase}"`)} created and assigned to ID ${id}.`);
                data[0].currency === " " ? console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`) : console.log("");
            }
            else {
                console.error(chalk.red(`\nError: category "${categoryToUppercase}" already exists\n`));
                name();
            }
        }
        else {
            console.error(chalk.red("\nError: no category entered"));
            console.error("Please enter a valid category");
        }
    });
}
//# sourceMappingURL=createNewCategory.js.map