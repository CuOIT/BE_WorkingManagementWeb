const express = require('express');
const router = express.Router();
const addUserRouter=require('./users');
const addWorkspaceRouter=require('./workspace')
const addWorkRouter=require('./work')
const addProjectRouter=require('./project')
const addInvitationRouter=require('./invitation')
const addTaskRouter=require('./task');
addUserRouter(router);
addWorkspaceRouter(router);
addWorkRouter(router);
addProjectRouter(router);
addInvitationRouter(router);
addTaskRouter(router);
module.exports = router;
