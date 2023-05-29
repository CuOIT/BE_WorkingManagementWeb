const projectController=require('../../controllers/projectController')


module.exports = (router)=>{
    router.put('/project/authorize',projectController.handleAuthorizeAdmin);
    router.delete('/project/leave-project',projectController.handleLeaveFromProject);
};
