const express = require('express');
const router = express.Router();
const addUserRouter=require('./users');
const addWorkspaceRouter=require('./workspace')
const addWorkRouter=require('./work')
const addTodoRouter = require('./todo')
const addProjectRouter = require('./project')

addUserRouter(router);
addWorkspaceRouter(router);
addWorkRouter(router);
addTodoRouter(router);
addProjectRouter(router);

module.exports = router;
