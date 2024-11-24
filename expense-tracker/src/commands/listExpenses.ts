import { readFile} from '../utils/expensesUtils.js';
import chalk from 'chalk'
import { readCategories} from '../utils/categoriesUtils.js';
import Table from 'cli-table3'
import {select,Separator,input} from '@inquirer/prompts'

export default (option : {year?: string | undefined}) => {
    async function list(){
        const date = new Date()
        let totalExpenses = 0
        let year = date.getFullYear().toString()
        if (option.year !== undefined) {
        if(option.year.length === 4){
            if (parseInt(option.year) > parseInt(year)){
                console.error(chalk.red(`Error: current year exceeded`))
                return
            }
            year = option.year

        }
        else{
            console.error(chalk.red('Error: invalid year'))
            console.error('Please enter a valid year.')
            return
        }
    }
        let data = readFile()
        if (data.length === 0){
            console.error('There are no expenses yet. Use add [options] to add a new expense.')
            console.error(("Sample: expense-tracker add --description 'Lunch' --amount 20"))
            return
        }
        var table = new Table({
            head: [chalk.blue('ID'),chalk.blue('Date'),chalk.blue('Description'),chalk.blue('Amount'),chalk.blue('Category')]
        })
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let listOptions = await select({
            message: `${process.argv.slice(2)[0] === "list" ? 'Would you like to filter the list of expenses?' : 'Would you like to filter the summary of expenses?'}`,
            choices: [{name:`${process.argv.slice(2)[0] === "list" ? 'No, show all expenses' : 'No, show total summary'}`,value:1},{name:"Filter by month",value:2},{name:"Filter by category",value:3},{name:"Filter by both",value:4},new Separator(`${option.year === undefined ? `\n(NB: this gets the ${process.argv.slice(2)[0] === "list" ? 'list of expenses' : 'summary of expenses'} for only the current year. If you would like to get for a specific year then run ${process.argv.slice(2)[0] === "list" ? "'expense-tracker list --year <year>'":"'expense-tracker summary --year <year>'"})` : ""}`)] 
        }
        )
        if (listOptions === 1){
                for (let i = 0;i < data.length;i = i + 1){
                    if(data[i].date.includes(`${year}-`)){
                        table.push([data[i].id,data[i].date,data[i].description,`${data[i].currency !== " " ? data[i].currency + data[i].amount : "$"+ data[i].amount}`,data[i].category])
                        totalExpenses = totalExpenses + data[i].amount
                    }
                }
                if (table.length === 0){
                    console.log(`No expenses recorded (year: ${year})`)
                    process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
                }
                else{
                    console.log(table.toString())
                    process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
                }
        }
        else if (listOptions === 2){
            let month = await input({message: 'Enter the month number (e.g., 11 for November):'})
            if (parseInt(month) > 12 || isNaN(Number(month))){
                 console.error(chalk.red('Error: no such month exists'))
                 console.error('Please enter a valid month.')
                 return
            }
            if (month.length === 1){
                month = "0"+month
            } 
                for (let i = 0; i < data.length;i = i + 1){
                    if (data[i].date.includes(`${year}-${month}-`)){
                        table.push([data[i].id,data[i].date,data[i].description,`${data[i].currency !== " " ? data[i].currency + data[i].amount : "$"+ data[i].amount}`,data[i].category])
                        totalExpenses = totalExpenses + data[i].amount
                    }
                }
                if (table.length !== 0){
                    console.log(table.toString())
                    process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for ${months[parseInt(month)-1]} ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
                }
                else{
                    console.error(`No expenses recorded for the month of ${months[parseInt(month)-1]} (year: ${year})`)
                    process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for ${months[parseInt(month)-1]} ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
                }
            }
           
        
        else if (listOptions === 3){
            let parsedCategories = readCategories()
                const category = await select({
            message: 'Select a category:',
            choices: parsedCategories
        })
        for (let i = 0;i < data.length;i = i + 1){
            if(data[i].date.includes((`${year}-`))){
                if(data[i].category === category){
                    table.push([data[i].id,data[i].date,data[i].description,`${data[i].currency !== " " ? data[i].currency + data[i].amount : "$"+ data[i].amount}`,data[i].category])
                    totalExpenses = totalExpenses + data[i].amount
                }
            }
        }
        if (table.length !== 0){
            console.log(table.toString())
            process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for category ${category} in ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
        }
        else{
            console.error(`\nNo expenses exist in category ${chalk.red(`"${category}"`)} (year: ${year})`)
            process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for category ${category} in ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
        }
        
    }
    if (listOptions === 4){
        let month = await input({message: 'Enter the month number (e.g., 11 for November):'})
        if (parseInt(month) > 12 || isNaN(Number(month))){
            console.error(chalk.red('Error: no such month exists'))
            console.error('Please enter a valid month.')
            return
       }
       if (month.length === 1){
        month = "0"+month
    } 
    let parsedCategories = readCategories()
                const category = await select({
            message: 'Select a category:',
            choices: parsedCategories
        })
        for (let i = 0;i < data.length;i = i + 1){
            if(data[i].date.includes((`${year}-${month}-`))){
                if(data[i].category === category){
                    table.push([data[i].id,data[i].date,data[i].description,`${data[i].currency !== " " ? data[i].currency + data[i].amount : "$"+ data[i].amount}`,data[i].category])
                    totalExpenses = totalExpenses + data[i].amount
                }
            }
        }
        if (table.length !== 0){
            console.log(table.toString())
            process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for category ${category} in ${months[parseInt(month)-1]} ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
        }
        else{
            console.error(`\nNo expenses exist in category ${chalk.red(`"${category}"`)} for the month of ${months[parseInt(month)-1]} (year: ${year})`)
            process.argv.slice(2)[0] === "summary" ? console.log(`Total expenses for category ${category} in ${months[parseInt(month)-1]} ${year}: ${data[0].currency}${totalExpenses.toFixed(2)}`) : ""
        }
    }
    }
    list()
}