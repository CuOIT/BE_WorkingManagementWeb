const projectController=require('../../controllers/projectController')

module.exports = (router)=>{

    router.post('/project',projectController.handleCretateProject);
    router.get('/project',projectController.handleGetProjectbyId)
    router.put('/project/:id',projectController.handleUpdateProject)
    router.delete('/project/:id',projectController.handleDeleteProject)
};