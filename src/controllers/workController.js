const workService = require("../services/workService");

const handleCreateNewWork = async (req, res) => {
    workService
        .createNewWork(req.body)
        .then((result) => res.status(201).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleUpdateWork = async (req, res) => {
    const data = {
        id: req.params.id,
        name: req.body.name,
        due_date: req.body.due_date,
        completed: req.body.completed,
        workspace_id: req.body.workspace_id,
    };
    workService
        .updateWorkById(data)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleDeleteWork = async (req, res) => {
    workService
        .deleteWorkById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleGetAllWorkByWorkspaceId = async (req, res) => {
    workService
        .findAllWorkByWorkspaceId(req.query.workspace_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
module.exports = {
    handleCreateNewWork,
    handleDeleteWork,
    handleUpdateWork,
    handleGetAllWorkByWorkspaceId,
};
