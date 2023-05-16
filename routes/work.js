var express = require('express');
var router = express.Router();
const workController=require('./../controllers/workController')

// GET /works
router.post('/newWork',workController.handleCreateNewWork);
router.put('/renameWork/:workspace_id',workController.handleRenameWork);
router.get('/getAllWorkByUserId/:workspace_id',workController.handleGetAllWorkByWorkspaceId);
router.delete('/deleteWork/:work_id',workController.handleDeleteWork);
module.exports = router;