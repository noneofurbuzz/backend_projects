var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readCategories } from "./categoriesUtils.js";
import { writeFile, readFile } from "./expensesUtils.js";
import { green } from "../constants.js";
import chalk from "chalk";
import { select } from "@inquirer/prompts";
export function browsePossibleCategories(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedCategories = readCategories();
        parsedCategories.push({ "name": "Previous", "value": "Previous" });
        const category = yield select({
            message: 'Browse possible categories',
            choices: parsedCategories
        });
        if (category !== "Previous") {
            let data = readFile();
            data[id - 1].category = category;
            writeFile(data);
            console.log(`Category ${chalk.hex(green)(`"${category}"`)} assigned to ID ${id}.`);
            if (data[0].currency === " ") {
                console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`);
            }
            else {
                console.log("");
            }
        }
        else {
            name();
        }
    });
}
//# sourceMappingURL=browsePossibleCategories.js.map