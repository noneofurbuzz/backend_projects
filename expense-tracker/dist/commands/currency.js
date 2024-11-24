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
import { readFile, writeFile } from '../utils/expensesUtils.js';
import { select } from '@inquirer/prompts';
function readCurrency() {
    let currency = fs.readFileSync('currency.json', 'utf-8');
    return JSON.parse(currency);
}
export default () => {
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
};
//# sourceMappingURL=currency.js.map