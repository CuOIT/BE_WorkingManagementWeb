const invitationController=require('./../../controllers/invitationController')

module.exports=(router)=>{
    router.get('/project/invite',invitationController.handleGetAllInvitation);
    router.post('/project/invite',invitationController.handleAddInvatition);
    router.put('/project/response-invitation/:id',invitationController.handleResponseInvitation);
}

