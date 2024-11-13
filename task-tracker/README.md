# Task Tracker CLI

Task Tracker CLI is a command-line interface tool to track and manage your tasks efficiently. This application allows you to add, update, delete, and manage the status of tasks. 

## Features

- **Add Task**: Add a new task with a description.
- **Update Task**: Update the description of an existing task.
- **Delete Task**: Delete a task by ID.
- **Mark Status**: Change task status to "in progress" or "done."
- **List Tasks**: Display all tasks, or filter tasks by status (done, todo, in progress).

## Task Properties

Each task contains:
- `id`: A unique identifier for the task.
- `description`: A brief description of the task.
- `status`: Current status of the task (`todo`, `in-progress`, `done`).
- `createdAt`: The date and time when the task was created.
- `updatedAt`: The date and time of the last update.

## Requirements

- Node.js

## Installation
### Clone the repository
```bash
git clone https://github.com/noneofurbuzz/task-tracker.git

# navigate to the project directory
cd task-tracker
```
### Install necessary dependecies
```bash
npm install
```
### Link globally
```bash
npm link
```
## Usage

1. **Add a new task**
   ```bash
   task-cli add "Buy groceries"
    # output: Task added successfully (ID: 1)
   ```
2. **Update an existing task**
     ```bash
     # update an existing task with (ID: 1)
   task-cli update 1 "Buy groceries and cook dinner"
    # output: Task updated successfully (ID: 1)
   ```
3. **Delete a task**
    ```bash
    # delete a task with (ID: 1)
   task-cli delete 1 
    # output: Task deleted successfully
   ```
4. **Mark task status**
    ```bash
    # mark task as done
   task-cli  mark-done 1
    # output: Task marked as done (ID: 1)

   # mark task as in-progress
   task-cli mark-in-progress 1
    # output: Task marked as in-progress (ID: 1)
   ```
5. **List all tasks**
    ```bash
    task-cli list
    ```
- **Or list tasks by status**
    ```bash
    # list tasks that are marked as todo
    task-cli list todo

    # list tasks that are marked as in-progress
    task-cli list in-progress

    # list tasks that are marked as done
    task-cli list done
    ```