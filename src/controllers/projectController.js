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
    const projectId = req.query.project_id;
    const userId = req.query.user_id;
    try {
        if (projectId) {
          const project = await projectService.getUserByProjectId(projectId);
          res.status(200).json(project);
        } else if (userId) {
          const projects = await projectService.getProjectById(userId);
          res.status(200).json(projects);
        }
      } catch (error) {
        res.status(500).json(error);
      }
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
let handleGetUserByProjectId = async (req, res) => {
    projectService
        .getUserByProjectId(req.params.project_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

module.exports = {
    handleAuthorizeAdmin,
    handleLeaveFromProject,
    handleCretateProject: handleCretateProject,
    handleGetProjectbyId: handleGetProjectbyId,
    handleUpdateProject: handleUpdateProject,
    handleDeleteProject: handleDeleteProject,
    handleAddMember:handleAddMember,
    handleGetUserByProjectId:handleGetUserByProjectId,
};
