const projectService = require("./../services/projectService");

const handleAuthorizeAdmin = async (req, res) => {
    projectService
        .authorizeAdmin(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleLeaveFromProject = async (req, res) => {
    projectService
        .leaveFromProject(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

let handleCretateProject = async (req, res) => {
    projectService
        .createProject(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

let handleGetProjectbyId = async (req, res) => {
    await projectService
        .getProjectById(req.query.user_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

let handleUpdateProject = async (req, res) => {
    const data = {
        id: req.params.id,
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        status: req.body.status,
    };
    projectService
        .updateProjectById(data)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
let handleDeleteProject = async (req, res) => {
    projectService
        .deleteProjectById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

let handleAddMember = async (req, res) => {
    projectService
        .addMember(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
let handleGetAllMemberOfProject = async (req, res) => {
    projectService
        .getAllMemberOfProject(req.query.project_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
let handleDeleteMemberOfProject = async (req, res) => {
    projectService
        .deleteMemberOfProject(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

module.exports = {
    handleAuthorizeAdmin,
    handleLeaveFromProject,
    handleCretateProject,
    handleGetProjectbyId,
    handleUpdateProject,
    handleDeleteProject,
    handleAddMember,
    handleGetAllMemberOfProject,
    handleDeleteMemberOfProject,
};
