import { readFile,writeFile } from '../utils/expensesUtils.js';
import chalk from 'chalk'
import {select} from '@inquirer/prompts'
import { green } from '../constants.js';
import { browsePossibleCategories } from '../utils/browsePossibleCategories.js';
import { createNewCategory } from '../utils/createNewCategory.js';

export default (options : {description: string, amount:number}) => {
    let data = readFile()
    if (isNaN(options.amount)){
        console.error(chalk.red("Error: amount must be a number"))
        console.error((chalk("Sample: expense-tracker add --description 'Lunch' --amount 20")))
        return
    }
    if (options.description.trim() === ""){
        console.error(chalk.red("Error: description cannot be empty"))
        return
    }
    data.push({
        id: data.length+1,
        description: options.description,
        amount: options.amount,
        date: new Date().toISOString().slice(0,10),
        category: "-",
        currency:data.length === 0 ? " " : data[0].currency

    })
    writeFile(data)
    console.log(chalk.hex(green)(`Expense added successfully (ID: ${data.length}, Amount: ${data[0].currency === " " ? "$": data[0].currency}${options.amount}, Description: ${options.description})`))
    async function addCategory(){
        const answer = await select({
        message: 'This expense has no category assigned. Would you like to assign one now?',
        choices: [
            {name: 'Choose from possible categories', value:1},
            {name: 'Create a new category', value:2},
            {name: 'Skip', value:3},
        ]
    })
    if (answer === 1){
        browsePossibleCategories(data.length,addCategory)
            
    }
    else if (answer === 2){
        createNewCategory(data.length,addCategory)
    }
    else{
        data[0].currency === " " ? console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`) : console.log("")
        return
    }}
    addCategory()
}