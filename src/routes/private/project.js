const projectController=require('../../controllers/projectController')


module.exports = (router)=>{
    router.put('/project/authorize',projectController.handleAuthorizeAdmin);
    router.delete('/project/leave-project',projectController.handleLeaveFromProject);
    router.post('/project',projectController.handleCretateProject);
    router.get('/project',projectController.handleGetProjectbyId)
    router.put('/project/:id',projectController.handleUpdateProject)
    router.delete('/project/:id',projectController.handleDeleteProject)
};