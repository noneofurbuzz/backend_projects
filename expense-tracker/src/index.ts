#!/usr/bin/env node
import fs from 'fs'
import { program } from '@commander-js/extra-typings';

type Properties = {
    id: number
    description: string
    amount: number
    date: string
}
let jsonData: string = "[]"
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

    })
program
    .parse(process.argv)
program.opts()