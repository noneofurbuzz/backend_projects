import { readFile,writeFile } from '../utils/expensesUtils.js';
import { browsePossibleCategories } from '../utils/browsePossibleCategories.js';
import chalk from 'chalk'
import {select} from '@inquirer/prompts'
import { green } from '../constants.js';
import { createNewCategory } from '../utils/createNewCategory.js';

export default (options : {id: number;description?: string | undefined;amount?: number | undefined;}) => {
    let data = readFile()
    if (isNaN(options.id)){
        console.error(chalk.red("Error: ID must be a number"))
        console.error((chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30")))
        return
    }
    if (options.description !== undefined && options.description.trim() === "" ){
        console.error(chalk.red("Error: description cannot be empty"))
        return
    }
    if (options.amount !== undefined && isNaN(options.amount)){
        console.error(chalk.red("Error: amount must be a number"))
        console.error(chalk("Sample: expense-tracker update --id 1 --amount 30"))
        return
    }
    let updateExpense = data.find((properties) => properties.id === options.id)
    if (updateExpense !== undefined){
        if (options.description !== undefined){
            updateExpense.description = options.description
        }
        if (options.amount !== undefined){
            updateExpense.amount = options.amount
        }
        if (options.description === undefined && options.amount === undefined){
            console.error(chalk.red('Error: must include either a description or amount to be updated'))
            console.error((chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30")))

        }
        else{
        writeFile(data)
        console.log(chalk.hex(green)(`Expense updated successfully (ID: ${options.id}${options.amount !== undefined ? `, Amount: ${data[0].currency === " " ? "$": data[0].currency}${options.amount}`: ""}${options.description !== undefined ? `, Description: ${options.description}`:""})`))
        
        async function updateCategory(): Promise<void | undefined>{
            const answer = await select({
                message: `Would you like to update the category for this expense? (category: ${updateExpense?.category === "-" ? "no category assigned" : updateExpense?.category})`,
                choices: [{name: 'Keep the current category', value: 1},
                         {name: 'Choose a different category', value: 2},
                         {name: 'Create a new category', value: 3},
                         {name: 'Remove category', value: 4},
                        ]
            }
            )
            if (answer === 1){
                data[0].currency === " " ? console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`) : console.log("")
                return
            }
            else if (answer === 2){
                browsePossibleCategories(options.id,updateCategory)
        }
        else if (answer === 3){
        createNewCategory(options.id,updateCategory)
        }
        else {
            data = readFile()
            let removeCategory = data.find((properties) => properties.id === options.id)
            let previousCategory = removeCategory?.category
            if (removeCategory){
                removeCategory.category = "-"
            }
            writeFile(data)
            console.log(`\n${previousCategory === "-" ? `${chalk.red(`ID ${options.id} is not assigned to a category`)}` : `ID ${options.id} removed from category ${chalk.hex(green)(`"${previousCategory}"`)}`}`)
        }
    }
    updateCategory()
}}
    if (!updateExpense){
        console.error(`${chalk.red(`Error: ID does not exist (ID: ${options.id})\n`)}Run 'expense-tracker list' to view recorded expenses and their corresponding IDSs`)
    }
        

}