import { readCategories } from "./categoriesUtils.js"
import { writeFile,readFile } from "./expensesUtils.js"
import { green } from "../constants.js"
import chalk from "chalk"
import { select } from "@inquirer/prompts"
export async function browsePossibleCategories(id: number,name: () => Promise<void>){
    let parsedCategories = readCategories()
        parsedCategories.push({"name": "Previous", "value":"Previous"})
        const category = await select({
            message: 'Browse possible categories',
            choices: parsedCategories
            })
            if(category !== "Previous"){
                let data = readFile()
                data[id - 1].category = category
                writeFile(data)
                console.log(`Category ${chalk.hex(green)(`"${category}"`)} assigned to ID ${id}.`)
                if (data[0].currency === " "){
                    console.log(`\nNB: Currency is automatically displayed in dollars. To change the default currency settings run 'expense-tracker currency'`)
                }
                else{
                    console.log("")
                }}
                else{
                    name()
                }
}
