import fs from 'fs'
import { readFile,writeFile } from '../utils/expensesUtils.js'
import { select } from '@inquirer/prompts'

type CurrencyProperties = {
    name:string
    value:string
}

function readCurrency(): CurrencyProperties[]{
    let currency = fs.readFileSync('currency.json','utf-8')
    return JSON.parse(currency)
}

export default () => {
    async function currency(){
        let currencyData = readCurrency()
        let data = readFile()
        const baseCurrency = await select({
            message: "Choose your currency",
            choices: currencyData,
        }
        )
        for(let i = 0;i < data.length;i = i + 1){
            data[i].currency = baseCurrency
        }
        writeFile(data)
    }
    currency()
}