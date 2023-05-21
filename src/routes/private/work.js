const workController=require('../../controllers/workController')


module.exports = (router)=>{
    router.post('/work',workController.handleCreateNewWork);
    router.put('/work/:id',workController.handleUpdateWork);
    router.get('/work',workController.handleGetAllWorkByWorkspaceId);
    router.delete('/work/:id',workController.handleDeleteWork);
};
