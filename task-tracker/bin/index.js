#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const {Command} = require('commander')
const program = new Command();

function writeFile(){
    fs.writeFileSync('tasks.json',"[]" ,(err) => {
        if (err) throw err}
    )    
}

function readFile(){
    if (fs.existsSync('tasks.json')){
        const data = fs.readFileSync('tasks.json',(err) => {
            if (err) throw err
        }) 
        return JSON.parse(data)
    }
    else{
       writeFile()
       return JSON.parse('[]')
    }

}
program
    .name('task-cli')
    .description("A simple CLI tool to manage tasks")
    .version('1.0.0')
program.configureOutput({
    writeErr: (str) => {
        str = str.replace('error: ', chalk.red('Error: '));
        process.stderr.write(str)
    }
})
program.on('command:*',function(){
    console.log(`${chalk.red("Error:")} unknown command\n`)
    program.help()
})
program
    .command('add <description>')
    .description('Add a task')
    .action((description) => {
        
        let data = readFile()
        for (i = 0;i <= 0;i++){

        }
        let taskProperty = {
            id: 1,
            description: "",
            status: "todo",
            createdAt: new Date(),
            updatedAt: ""
        } 
        taskProperty.description = description
        taskProperty.id = (data.length) + 1
        data.push(taskProperty) 
        data = JSON.stringify(data,null,5)
        fs.writeFileSync('tasks.json',data,(err) => {
            if (err) throw err
        })
        console.log(chalk.hex('#4bb543')(`Task added successfully (ID: ${taskProperty.id})`))
    })
    .showHelpAfterError(chalk("Example: task-cli add 'Buy groceries'"))

    
    
program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
        
        let data = readFile()
        if (data.length >= id){
        let deleteTask = data.filter((task) => task.id != id)
        let updatedTaskList = deleteTask.map((task) => {
            task.id = deleteTask.indexOf(task) + 1               
        }
        )
        
            deleteTask = JSON.stringify(deleteTask,null,5)
            fs.writeFileSync('tasks.json',deleteTask,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543')("Task deleted successfully"))
        }
        else{
            console.log(chalk.red(`No such (ID: ${id}) exists. No tasks deleted`))
        }}
    )
    .showHelpAfterError("Example: task-cli delete 1\nRun 'task-cli list' to view existing tasks and their corresponding IDs")
            

program
        .command('update <id> <new\u00A0description>')
        .description('Update a task')
        .action((id,description) => {
            let data = readFile()
            
            if (data.length >= id){
                data[id-1].description = description
                data[id-1].updatedAt = new Date()
                data = JSON.stringify(data,null,5)
                fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543')(`Task updated successfully (ID: ${id})`))
            }
            else{
                console.log(chalk.red(`No such (ID: ${id}) exists. No tasks updated`))
            }})
        .showHelpAfterError("Example: task-cli update 1 'Buy groceries and cook dinner'\nRun 'task-cli list' to view existing tasks and their corresponding IDs")
        
        
program
        .command('mark-done <id>')
        .description("Mark a task as done")
        .action((id) => {
            let data = readFile()
            
            if (data.length >= id){
            data[id - 1].status = "done"
            data = JSON.stringify(data,null,5)
            fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543')(`Task marked as done (ID: ${id})`))
            }
            else{
                console.log(chalk.red(`No such (ID: ${id}) exists`))
            }})
        .showHelpAfterError("Example: task-cli mark-done 1\nRun 'task-cli list' to view existing tasks and their corresponding IDs")

program
        .command('mark-in-progress <id>')
        .description("Mark a task as in progress")
        .action((id) => {
            let data = readFile()
            if (data.length >= id){
            data[id - 1].status = "in-progress"
            data = JSON.stringify(data,null,5)
            fs.writeFileSync('tasks.json',data,(err) => {
                if (err) throw err
            })
            console.log(chalk.hex('#4bb543')(`Task marked as in-progress (ID: ${id})`))
            }
            else{
                console.log(chalk.red(`No such (ID: ${id}) exists`))
            }
        })
        .showHelpAfterError("Example: task-cli mark-in-progress 1\nRun 'task-cli list' to view existing tasks and their corresponding IDs")
        
program
        .command('list [status]')
        .description("List all tasks or list tasks by status")
        .action((status) => {
            let data = readFile()
            if (status == null){
                if (data.length != 0){ 
                    console.log(chalk("Listing all tasks:"))
                for (let i = 0;i < data.length;i = i + 1){
                console.log(`${chalk(`${data[i].id}. ${data[i].description}`)} ${data[i].status == "in-progress" ? chalk.yellow(`(status: ${data[i].status})`) : (data[i].status == "done" ? chalk.hex('4bb543')(`(status: ${data[i].status})`) : chalk.red(`(status: ${data[i].status})`)) } ${chalk.blue(`[ID: ${data[i].id}]`)}`)
                }
            }
            else{
                console.log(chalk("No tasks found"))
            }
        }
            else if (status == "done"){
                let index = 1
                let count = 1
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "done"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk(`Listing tasks by `)}${chalk.hex('4bb543')(`(status: done)`)}:`)
                            count ++
                        }
                        console.log(`${chalk(`${index}. ${data[i].description}`)} ${chalk.blue(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                    }
                    if(statusCount.length == 0){
                        console.log(chalk("No tasks found"))
                }}
            else if (status == "in-progress"){
                let index = 1
                let count = 1
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "in-progress"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk(`Listing tasks by `)}${chalk.yellow(`(status: in-progress)`)}:`)
                            count ++
                        }
                        console.log(`${chalk(`${index}. ${data[i].description}`)} ${chalk.blue(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }
                if(statusCount.length == 0){
                    console.log(chalk("No tasks found"))
            }
            }
            else if (status == "todo"){
                let index = 1
                let count = 1 
                let statusCount = []
                for (let i = 0;i <data.length;i = i + 1){
                    if (data[i].status == "todo"){
                        statusCount.push(data[i].status)
                        while(count == 1){
                            console.log(`${chalk(`Listing tasks by `)}${chalk.red(`(status: todo)`)}:`)
                            count ++
                        }
                        console.log(`${chalk(`${index}. ${data[i].description}`)} ${chalk.blue(`[ID: ${data[i].id}]`)}`)
                        index++
                    }
                }
                if(statusCount.length == 0){
                    console.log(chalk("No tasks found"))
            }
            }
            else{
                console.log(`${chalk.red(`No such status exists. Did you mean 'done', 'in-progress', or 'todo'? `)}`)
            }
            }
        )


program.parse(process.argv)