import fs from 'fs'

type Properties = {
    id: number
    description: string
    amount: number
    date: string
    category: string
    currency:string
}

export function writeFile(data: Properties[]){
    fs.writeFile('expenses.json',JSON.stringify(data),(err) => {
        if (err) throw err
    })
}
export function readFile(): Properties[]{
    if (fs.existsSync('expenses.json')){
        let data =  fs.readFileSync('expenses.json','utf-8')
        return JSON.parse(data)
    }
    else{
        return []
    }
}
