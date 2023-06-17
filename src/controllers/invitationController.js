const invatitationService=require('./../services/invitationService')

const handleAddInvatition =  (req,res)=>{
    invatitationService.addInvitation(req.body)
    .then(
        result =>{
            res.status(200).json(result);
        }
    )
    .catch(error=>res.status(500).json(error))
}

const handleResponseInvitation=(req,res)=>{
    const data={
        id:req.params.id,
        response:req.body.response
    }
    invatitationService.responseInvitation(data)
    .then(
        result =>{
            res.status(200).json(result);
        }
    )
    .catch(error=>res.status(500).json(error))
}

const handleGetAllInvitation=(req,res)=>{
    invatitationService.getAllInvitation(req.query.receiver_id)
    .then(
        result =>{
            res.status(200).json(result);
        }
    )
    .catch(error=>res.status(500).json(error))
}

module.exports={
    handleAddInvatition,
    handleResponseInvitation,
    handleGetAllInvitation,

}