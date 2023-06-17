const todoService = require("../services/todoService");


let handleCreateTodo = async (req, res) => {
    todoService.createTodo(req.body)
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}

const handleUpdateTodo=async(req,res)=>{
    const data={
        id:req.params.id,
        name:req.body.name,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        date:req.body.date,
        level:req.body.level,
        completed:req.body.completed
    }
    todoService.updateTodoById(data) 
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}

let handleDeleteTodo = async (req, res) => {
    todoService.deleteTodoById(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}
let handleGetAllTodo = async (req, res) => {
    let user_id = req.query.user_id;
    let date = req.query.date;
    let msg = await todoService.getAllTodoByDateAndId(user_id,date)
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}

module.exports = {
    handleCreateTodo:handleCreateTodo,
    handleUpdateTodo:handleUpdateTodo,
    handleDeleteTodo:handleDeleteTodo,
    handleGetAllTodo:handleGetAllTodo
}