const express = require('express');
const router = express.Router();
const addUserRouter=require('./users');
const addWorkspaceRouter=require('./workspace')
const addWorkRouter=require('./work')
const addTodoRouter = require('./todo')

addUserRouter(router);
addWorkspaceRouter(router);
addWorkRouter(router);
addTodoRouter(router)


module.exports = router;
