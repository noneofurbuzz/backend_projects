import fs from 'fs'
import { readFile } from "../utils/expensesUtils.js"
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'
import open from 'open'


function writeCSV(file_path: string,data:string){
    fs.writeFile(file_path,data,(err) => {
        if (err) throw err
    })
}

export default (file_path: string) => {

let data = readFile()
if (data.length === 0){
    console.error(`There are no expenses yet. Use 'expense-tracker add [options]'' to add a new expense.`)
    console.error(("Sample: expense-tracker add --description 'Lunch' --amount 20"))
    return
}
let columns = `id,description,amount,date,category`
for (let i = 0;i < data.length; i = i + 1){
    data[i].currency = ""
    columns = columns + "\n" + Object.values(data[i])
}

if (process.argv.slice(3)[0].includes('.csv') === false){
    console.error(chalk.red('Error: only .csv files can be processed at this time'))
    console.error(`Sample: expense-tracker export expenses.csv`)
    return
}
else{
    writeCSV(file_path,columns)
    open(`${path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))))+'/'+file_path}`)
}
}