"use strict";
// Task 3: Manage a Task List
// Difficulty: Intermediate
// Create a simple task management system using TypeScript. Follow these steps:
// Define an enum for task TaskStatus: Pending, InProgress, and Completed.
// Define a Task interface with the following properties:
// id: number
// title: string
// description: string (optional)
// status: Task status from the enum defined earlier.
// Create a class called TaskManager with the following features:
// A private array to hold tasks.
// A method to add a task (returns the added task).
// A method to update a task's status (by ID).
// A method to list all tasks filtered by a specific status.
// Add a few tasks and demonstrate the functionality of TaskManager.
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "Pending";
    TaskStatus["InProgress"] = "InProgress";
    TaskStatus["Completed"] = "Completed";
})(TaskStatus || (TaskStatus = {}));
class TaskManager {
    constructor() {
        this.tasks = [];
        this.defaultTask = {
            id: 1,
            title: "Learning Typescript",
            description: "the task is completely described by its name",
            status: TaskStatus.InProgress,
        };
    }
    addTask(task) {
        this.tasks.push(task);
        this.tasks.forEach((task) => {
            console.log(task);
        });
        return this.tasks;
    }
    updateTaskStatus(taskId, updateTaskStatus) {
        let taskToUpdate = this.tasks.find((task) => taskId === task.id);
        if (taskToUpdate) {
            taskToUpdate.status = updateTaskStatus;
            return taskToUpdate;
        }
        else {
            console.log(`404, There is no any task with id ${taskId}`);
        }
    }
    addDefaultTask() {
        return this.addTask(this.defaultTask);
    }
    listTasksByStatus() {
        const categorizedTask = {
            Pending: [],
            InProgress: [],
            Completed: [],
        };
        this.tasks.forEach((task) => {
            categorizedTask[task.status].push(task);
        });
        console.table(categorizedTask.Pending, [
            "id",
            "title",
            "description",
            "status",
        ]);
        console.table(categorizedTask.InProgress, [
            "id",
            "title",
            "description",
            "status",
        ]);
        console.table(categorizedTask.Completed, [
            "id",
            "title",
            "description",
            "status",
        ]);
    }
}
//Testing Task Mangager Class
const tmg = new TaskManager();
tmg.addTask({
    id: 1,
    title: "Learn TypeScript",
    description: "Understanding TypeScript basics and advanced concepts",
    status: TaskStatus.InProgress,
});
tmg.addTask({
    id: 2,
    title: "Complete Task 3",
    status: TaskStatus.Pending,
});
tmg.addTask({
    id: 3,
    title: "Submit Assignment",
    description: "Ensure all intermediate tasks are done",
    status: TaskStatus.Completed,
});
tmg.addTask({
    id: 3,
    title: "Complete Task 3",
    description: "Complete Task 3 of intermediate level of typescript",
    status: TaskStatus.Completed,
});
// Update task status
tmg.updateTaskStatus(2, TaskStatus.InProgress);
// List all tasks by status
tmg.listTasksByStatus();
