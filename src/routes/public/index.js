const express = require('express');
const router = express.Router();

const userController=require('../../controllers/userController')

  router.post('/user/signup',userController.handleCreateNewUser)
  router.post('/user/login',userController.handleUserLogin)

module.exports=router;