const todoController=require('../../controllers/todoController')

module.exports = (router)=>{

    // router.post('/create-todolist',todoController.handleCreateTodoList);
    // router.get('/get-todolist',todoController.handleGetTodoList);
    // router.post('/delete-todolist',todoController.handleDeleteTodoList);
    router.post('/to-do',todoController.handleCreateTodo);
    router.put('/to-do/:id',todoController.handleUpdateTodo);
    router.delete('/to-do/:id',todoController.handleDeleteTodo);
    router.get('/to-do',todoController.handleGetAllTodo);

};