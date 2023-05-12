var express = require('express');
var router = express.Router();
const userController=require('./../controllers/userController')

// GET /users
router.get('/', (req, res, next) => {
  console.log("HI");
});
router.post('/signup',userController.handleCreateNewUser)



router.post('/login',userController.handleUserLogin)

module.exports = router;
