const workspaceService = require("../services/workspaceService");

const handleCreateNewWorkspace = async (req, res) => {
    workspaceService
        .createNewWorkspace(req.body)
        .then((result) => res.status(201).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleRenameWorkspace = async (req, res) => {
    const data = {
        id: req.params.id,
        name: req.body.name,
    };
    workspaceService
        .renameWorkspace(data)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleDeleteWorkspace = (req, res) => {
    workspaceService
        .deleteWorkspaceById(req.params.id)
        .then((result) => res.status(204).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleGetAllWorkspaceByUserId = async (req, res) => {
    workspaceService
        .findAllWorkspaceByUserId(req.query.user_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
module.exports = {
    handleCreateNewWorkspace: handleCreateNewWorkspace, //OKE
    handleRenameWorkspace: handleRenameWorkspace, //OKE
    handleDeleteWorkspace: handleDeleteWorkspace, //OKE
    handleGetAllWorkspaceByUserId: handleGetAllWorkspaceByUserId, //OKE
};
