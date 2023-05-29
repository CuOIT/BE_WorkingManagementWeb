const taskController=require('./../../controllers/taskController')

module.exports=(router)=>{
    router.post('/project/add-task',taskController.handleAddTask);
    router.put('/project/update-task/:id',taskController.handleUpdateTask);
    router.delete('/project/delete-task/:id',taskController.handleDeleteTask);
    router.get('/project/get-tasks',taskController.handleGetAllTaskOfProject);
}