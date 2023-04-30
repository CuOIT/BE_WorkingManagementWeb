var express = require('express');
var router = express.Router();
const { user } = require('../models');
const db=require("./../models/index");
const userController=require('./../controllers/userController')
console.log(user);
// GET /users
router.get('/', (req, res, next) => {
  db.User.findAll().then(users => res.json(users));
  console.log("HI");
});
router.post('/signup',userController.handleCreateNewUser)



router.post('/login',userController.handleUserLogin)

module.exports = router;
