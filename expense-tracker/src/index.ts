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
    .requiredOption('--amount <amount>','amount of an expense',parseFloat)
    .description('add an expense with a description and amount')
    .action((options : {description: string, amount:number}) => {
        let data: Properties[] = readFile()
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
program
    .command('update')
    .requiredOption('--id <id>','id of an expense',parseInt)
    .requiredOption('--description <description>','description of an expense')
    .requiredOption('--amount <amount>','amount of an expense',parseFloat)
    .action((options) => {
        let data: Properties[] = readFile()
        data.map((properties) => {
            if (properties.id === options.id){
                properties.description = options.description
                properties.amount = options.amount
            }
        })
        jsonData = JSON.stringify(data)
        writeFile()
        console.log(chalk.hex(green)(`Expense updated successfully (ID: ${options.id})`))
    })
program
    .parse(process.argv)