import fs from 'fs';
export function writeFile(data) {
    fs.writeFile('expenses.json', JSON.stringify(data), (err) => {
        if (err)
            throw err;
    });
}
export function readFile() {
    if (fs.existsSync('expenses.json')) {
        let data = fs.readFileSync('expenses.json', 'utf-8');
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
//# sourceMappingURL=expensesUtils.js.map