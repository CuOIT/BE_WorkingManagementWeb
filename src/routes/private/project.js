const projectController = require("../../controllers/projectController");

module.exports = (router) => {
    router.put("/project/authorize", projectController.handleAuthorizeAdmin);
    router.delete("/project/leave-project", projectController.handleLeaveFromProject);
    router.post("/project", projectController.handleCretateProject);
    router.get("/project", projectController.handleGetProjectbyId);
    router.put("/project/:id", projectController.handleUpdateProject);
    router.delete("/project/delete-project/:id", projectController.handleDeleteProject);
    router.post("/project/add-member", projectController.handleAddMember);
    router.get("/project/get-member", projectController.handleGetAllMemberOfProject);
    router.delete("/project/delete-member", projectController.handleDeleteMemberOfProject);
};
