const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

router.post("/user/signup", userController.handleCreateNewUser);
router.post("/user/login", userController.handleUserLogin);
router.post("/user/refresh-token", userController.handleRefreshToken);
router.get("/user/find-user-by-user-name", userController.handleFindUserByUserName);
router.put("/user/update/:user_id", userController.handleEditUser);
module.exports = router;
