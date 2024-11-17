#!/usr/bin/env node
import fs from 'fs'
import chalk from 'chalk'
import { program } from '@commander-js/extra-typings';

type Properties = {
    id: number
    description: string
    amount: number
    date: string
}
let jsonData: string = "[]"
const green = '#4bb543'
function writeFile(){
    fs.writeFile('expenses.json',jsonData,(err) => {
        if (err) throw err
    })
}
function readFile(): Properties[]{
    if (fs.existsSync('expenses.json')){
        let data =  fs.readFileSync('expenses.json','utf-8')
        return JSON.parse(data)
    }
    else{
        writeFile()
        return JSON.parse(jsonData)
        
    }
}
program
    .name('expense-tracker')
    .description('track your expenses')
    .version('1.0.0')
program
    .command('add')
    .requiredOption('--description <description>','description of an expense')
    .requiredOption('--amount <amount>','amount of an expense',Number)
    .description('add an expense with a description and amount')
    .action((options : {description: string, amount:number}) => {
        let data: Properties[] = readFile()
        if (isNaN(options.amount)){
            console.error(chalk.red("Error: amount must be a number"))
            console.error((chalk("Sample: expense-tracker add --description 'Lunch' --amount 20")))
            return
        }
        data.push({
            id: data.length+1,
            description: options.description,
            amount: options.amount,
            date: new Date().toISOString().slice(0,10)

        })
        jsonData = JSON.stringify(data)
        writeFile()
        console.log(chalk.hex(green)(`Expense added successfully (ID: ${data.length})`))
    })
    .showHelpAfterError(chalk("Sample: expense-tracker add --description 'Lunch' --amount 20"))
program
    .command('update')
    .requiredOption('--id <id>','id of an expense',Number)
    .option('--description <description>','description of an expense')
    .option('--amount <amount>','amount of an expense',Number)
    .action((options) => {
        let data: Properties[] = readFile()
        if (isNaN(options.id)){
            console.error(chalk.red("Error: ID must be a number"))
            console.error((chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30")))
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
                jsonData = JSON.stringify(data)
            writeFile()
            console.log(chalk.hex(green)(`Expense updated successfully (ID: ${options.id})`))
            }
        }
        if (!updateExpense){
            console.error(chalk.red(`Error: ID does not exist (ID: ${options.id})\nRun 'expense-tracker list' to view recorded expenses and their corresponding IDs`))
        }
    })
    .configureOutput({outputError(str, write) {
        if (str.startsWith("error: option '--id <id>' argument missing") ||str.startsWith("error: required option '--id <id>' not specified") ){
            write(chalk.red("Error: missing ID\nRun 'expense-tracker list' to view recorded expenses and their corresponding IDs"))
        }
        else(write(str))
    }})
    .showHelpAfterError(chalk("Sample: expense-tracker update --id 1 --description 'Breakfast' --amount 30"))
program.configureOutput({
    outputError(str, write) {
        if (str.startsWith("error: option '--description <description>' argument missing") || str.startsWith("error: option '--amount <amount>' argument missing") ||  str.startsWith("error: required option '--amount <amount>' not specified") || str.startsWith("error: required option '--description <description>' not specified")){
            write(chalk.red('Error: missing description or amount\n'))
        }
        else{
            write(str)
        }
    }
})
program
    .parse(process.argv)