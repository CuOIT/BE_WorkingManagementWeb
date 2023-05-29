const projectService = require('./../services/projectService')

const handleAuthorizeAdmin = async(req,res)=>{
    projectService.authorizeAdmin(req.body)
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}

const handleLeaveFromProject = async(req,res)=>{
    projectService.leaveFromProject(req.body)
    .then(result => res.status(200).json(result))
    .catch(error=>res.status(500).json(error));
}

module.exports = {
    handleAuthorizeAdmin,
    handleLeaveFromProject,
}