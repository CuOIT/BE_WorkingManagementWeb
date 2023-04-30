const userService =require("../services/userService");
let handleCreateNewUser = async (req, res) => {
    console.log("body",req.body);
    let msg = await userService.createNewUSer(req.body);
    return res.status(200).json(
        msg
    )
}
let handleUserLogin = async (req, res) => {
    let phone = req.body.phone;
    let password = req.body.password;
    if (!phone || !password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let userData = await userService.handleLogin(phone, password);
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}
module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    handleUserLogin: handleUserLogin
}