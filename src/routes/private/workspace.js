const workspaceController=require('../../controllers/workspaceController')

module.exports = (router)=>{

    router.post('/workspace',workspaceController.handleCreateNewWorkspace);
    router.put('/workspace/:id',workspaceController.handleRenameWorkspace);
    router.get('/workspace',workspaceController.handleGetAllWorkspaceByUserId);
    router.delete('/workspace/:id',workspaceController.handleDeleteWorkspace);
};