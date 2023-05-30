const projectService = require("../services/projectService");

let handleCretateProject = async (req, res) => {
    console.log("body",req.body);
    let msg = await projectService.createProject(req.body);
    return res.status(200).json(
        msg
    )
}

let handleGetProjectbyId = async (req, res) => {
    let user_id = req.query.user_id;
    let msg = await projectService.getProjectById(user_id);
    return res.status(200).json(
        msg
    )
}


let handleUpdateProject = async (req, res) => {
    const data={
        id:req.params.id,
        name:req.body.name,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        description:req.body.description,
        status:req.body.status
    }
    let msg = await projectService.updateProjectById(data);

    return res.status(200).json(
        msg
    )
}
let handleDeleteProject = async (req, res) => {
    let msg = await projectService.deleteProjectById(req.params.id);
    return res.status(200).json(
        msg
    )
}

module.exports = {
    handleCretateProject:handleCretateProject,
    handleGetProjectbyId:handleGetProjectbyId,
    handleUpdateProject:handleUpdateProject,
    handleDeleteProject:handleDeleteProject
}