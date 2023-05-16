var express=require('express');
var router=express.Router();

router.get('/todoList',todolistController);
module.exports = router;