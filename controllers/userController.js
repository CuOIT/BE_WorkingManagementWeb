const userService =require("../services/userService");
const jwt=require("jsonwebtoken");

let handleCreateNewUser = async (req, res) => {
    console.log("body",req.body);
    let msg = await userService.createNewUSer(req.body);
    return res.status(200).json(
        msg
    )
}
let handleUserLogin = async (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }
    const accessToken = jwt.sign({email},process.env.SECRET,{expiresIn:'10m'});
    let userData = await userService.handleLogin(email, password);
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
    ...(userData.user ? { user: userData.user } : {}),
    ...(userData.user ? { accessToken } : {}),
    })
}
module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    handleUserLogin: handleUserLogin
}