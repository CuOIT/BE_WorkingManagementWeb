const taskService=require('./../services/taskService')
const handleAddTask = (req,res)=>{
    console.log("HI")
    taskService.addTask(req.body)
    .then(result=>{
        console.log("HHI");
        res.status(201).json(result);
    })
    .catch(error=>res.status(500).json(error))
}

const handleUpdateTask = (req,res)=>{
    data=req.body;
    data={id:req.params.id,...data}
    taskService.updateTask(data)
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(500).json(error))
}


const handleDeleteTask = (req,res)=>{
    taskService.deleteTask(req.params.id)
    .then(result=>res.status(204).json(result))
    .catch(error=>res.status(500).json(error))
}

const handleGetAllTaskOfProject=(req,res)=>{
    taskService.getAllTaskOfProject(req.query.project_id)
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(500).json(error))
}

module.exports={
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleGetAllTaskOfProject
}