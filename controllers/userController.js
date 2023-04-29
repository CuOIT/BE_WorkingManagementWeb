const userService =require("../services/userService");
let handleCreateNewUser = async (req, res) => {
    console.log("body",req.body);
    let msg = await userService.createNewUSer(req.body);
    return res.status(200).json(
        msg
    )
}

module.exports = {
    handleCreateNewUser: handleCreateNewUser
}