import fs from 'fs'

export function writeCategories(categories: {name:string, value:string}[]){
    fs.writeFile('categories.json',JSON.stringify(categories),(err) => {
        if (err) throw err
    })
}
export function readCategories(): {name: string, value: string}[]{
    if (fs.existsSync('categories.json')){
        let categories = fs.readFileSync('categories.json','utf-8')
        return JSON.parse(categories) 
    }
    else{
        return [{"name": "Food", "value":"Food"},
        {"name": "Transport", "value":"Transport"},
        {"name": "Entertainment", "value":"Entertainment"}]
        
        
    }
}