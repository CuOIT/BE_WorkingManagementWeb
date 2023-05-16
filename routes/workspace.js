var express = require('express');
var router = express.Router();
const workspaceController=require('./../controllers/workspaceController')

// GET /Workspaces
router.post('/newWorkspace',workspaceController.handleCreateNewWorkspace);
router.put('/renameWorkspace/:user_id',workspaceController.handleRenameWorkspace);
router.get('/getAllWorkspaceByUserId/:user_id',workspaceController.handleGetAllWorkspaceByUserId);
router.delete('/deleteWorkspace/:user_id',workspaceController.handleDeleteWorkspace);
module.exports = router;