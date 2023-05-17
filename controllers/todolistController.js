const todoService = require("../services/todoService");

let handleCreateTodoList = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.createNewTodoList(req.body);
    return res.status(200).json(
        msg
    )
}

let handleGetTodoList = async (req, res) => {
    let user_id = req.query.user_id;
    let date = req.query.date
    let msg = await todoService.getTodoList(user_id,date);
    return res.status(200).json(
        msg
    )
}

let handleCreateTask = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.createTask(req.body);
    return res.status(200).json(
        msg
    )
}

let handleUpdateTask = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.updateTask(req.body);
    return res.status(200).json(
        msg
    )
}

let handleDeleteTask = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.deleteTask(req.body);
    return res.status(200).json(
        msg
    )
}
let handleGetAllTask = async (req, res) => {
    let todolist_id = req.query.todolist_id;
    let user_id = req.query.user_id;
    let msg = await todoService.getAllTask(todolist_id,user_id);
    return res.status(200).json(
        msg
    )
}

let handleDeleteTodoList = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.deleteTodolist(req.body);
    return res.status(200).json(
        msg
    )
}
module.exports = {
    handleCreateTodoList: handleCreateTodoList,
    handleGetTodoList:handleGetTodoList,
    handleCreateTask:handleCreateTask,
    handleUpdateTask:handleUpdateTask,
    handleDeleteTask:handleDeleteTask,
    handleGetAllTask:handleGetAllTask,
    handleDeleteTodoList:handleDeleteTodoList
}