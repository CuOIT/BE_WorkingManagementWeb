var express = require('express');
var router = express.Router();
const userController=require('./../controllers/userController');
const todolistController = require('../controllers/todolistController');

// GET /users
router.get('/', (req, res, next) => {
  console.log("HI");
});

router.post('/signup',userController.handleCreateNewUser)
router.post('/login',userController.handleUserLogin)

router.post('/create-todolist',todolistController.handleCreateTodoList)
router.get('/get-todolist',todolistController.handleGetTodoList)
router.post('/create-task',todolistController.handleCreateTask)
router.post('/update-task',todolistController.handleUpdateTask)
router.delete('/delete-task',todolistController.handleDeleteTask)
router.get('/get-all-task',todolistController.handleGetAllTask)
router.post('/delete-todolist',todolistController.handleDeleteTodoList)

module.exports = router;
