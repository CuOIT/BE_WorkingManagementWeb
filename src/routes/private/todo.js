const todoController=require('../../controllers/todoController')

module.exports = (router)=>{
    router.post('/to-do',todoController.handleCreateTodo);
    router.put('/to-do/:id',todoController.handleUpdateTodo);
    router.delete('/to-do/:id',todoController.handleDeleteTodo);
    router.get('/to-do',todoController.handleGetAllTodo);

};
