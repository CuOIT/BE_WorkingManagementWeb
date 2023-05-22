const todoService = require("../services/todoService");


let handleCreateTodo = async (req, res) => {
    console.log("body",req.body);
    let msg = await todoService.createTodo(req.body);
    return res.status(200).json(
        msg
    )
}

const handleUpdateTodo=async(req,res)=>{
    const data={
        id:req.params.id,
        name:req.body.name,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        date:req.body.date,
        level:req.body.level,
        isDone:req.body.isDone
    }
    const result = await todoService.updateTodoById(data);
    res.json(
        result
    )
}

let handleDeleteTodo = async (req, res) => {
    let msg = await todoService.deleteTodoById(req.params.id);
    return res.status(200).json(
        msg
    )
}
let handleGetAllTodo = async (req, res) => {
    let user_id = req.query.user_id;
    let date = req.query.date;
    let msg = await todoService.getAllTodoByDateAndId(user_id,date);
    return res.status(200).json(
        msg
    )
}

module.exports = {
    handleCreateTodo:handleCreateTodo,
    handleUpdateTodo:handleUpdateTodo,
    handleDeleteTodo:handleDeleteTodo,
    handleGetAllTodo:handleGetAllTodo
}