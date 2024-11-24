import { readFile,writeFile } from '../utils/expensesUtils.js';
import chalk from 'chalk'
import { readCategories,writeCategories } from '../utils/categoriesUtils.js';
import { green } from '../constants.js';

export default (options: {delete: string})=> {
    let data = readFile()
    let categoryToUppercase = options.delete.slice(0,1).toUpperCase()+options.delete.slice(1,options.delete.length).toLowerCase()
    let categoriesJson = readCategories()
    let deleteCategories = categoriesJson.findIndex((categories) => categories.name ===  categoryToUppercase)
    if(options.delete !== "" && options.delete.trim() !== ""){
        if (deleteCategories !== -1){
            categoriesJson.splice(deleteCategories,1)
            let categories = data.filter((properties) => properties.category === categoryToUppercase)
            if (categories.length !== 0){
                for (let i = 0; i < categories.length;i = i + 1){
                    categories[i].category = "-"
                    console.log(`ID ${categories[i].id} unassigned from category ${chalk.hex(green)(`"${categoryToUppercase}"`)}`)
                }
                
            }
            writeFile(data)
            writeCategories(categoriesJson)
            console.log(`\nCategory ${chalk.hex(green)(`"${categoryToUppercase}"`)} deleted successfully.`)
        }
        else{
            console.error(`${chalk.red(`Error: category "${categoryToUppercase}" does not exist\n`)}Run 'expense-tracker category-list' to view existing categories`)
        }
    }
    else{
        console.error(`${chalk.red(`Error: no category entered\n`)}Sample: expense-tracker category --delete 'Food'`)
    }
}