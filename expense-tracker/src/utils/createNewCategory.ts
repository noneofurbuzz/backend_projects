import { readCategories,writeCategories } from "./categoriesUtils.js"
import { writeFile,readFile } from "./expensesUtils.js"
import { green } from "../constants.js"
import chalk from "chalk"
import { input } from "@inquirer/prompts"

export async function createNewCategory(id:number,name: () => Promise<void>){
    const category = await input({message: 'Enter the name of the new category:'})
        let data = readFile()
        if (category !== "" && category.trim() !== ""){
        let categoryToUppercase = category.slice(0,1).toUpperCase()+category.slice(1,category.length).toLowerCase()
        let parsedCategories = readCategories()
        let availableCategories = parsedCategories.find((categories) => categoryToUppercase === categories.name )
        if (availableCategories === undefined){
            data[id - 1].category = categoryToUppercase
        writeFile(data)
            parsedCategories.push({"name":data[id - 1].category,"value":data[id - 1].category})
        writeCategories(parsedCategories)
        console.log(`\nCategory ${chalk.hex(green)(`"${categoryToUppercase}"`)} created and assigned to ID ${id}.`)
        data[0].currency === " " ? console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`) : console.log("")
        }else{
            console.error(chalk.red(`\nError: category "${categoryToUppercase}" already exists\n`))
            name()
        }}
        else{
            console.error(chalk.red("\nError: no category entered"))
            console.error("Please enter a valid category")
        }
        
}