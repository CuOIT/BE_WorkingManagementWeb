const userService =require("../services/userService");
const token= require('./../Utils/token')

let handleCreateNewUser = async (req, res) => {
    userService.createNewUSer(req.body)
    .then((result)=>{res.status(201).json({
        result
    })})
}
let handleUserLogin = async (req, res) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({
                success: "false",
                message: 'Missing required parameters'
            })
        }
        let user = await userService.handleLogin(email, password);
        if(user) 
        {   
            const user_id=user.user_id;
            const accessToken = token.generateAccessToken({user_id});
            const refreshToken=token.generateRefreshToken({user_id});
            const {password,...userWithoutPassword}={user};
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path:"/",
                sameSite:"strict"
            })
            return res.status(200).json({
            success:"true",
            message:"Login successfully",
            data:userWithoutPassword,
            accessToken,
        })}
    else{
        return res.status(400).json({
            success:"false",
            message:"Incorrect email or password"
        })
    }
}catch(error){
    console.log({error})
    return res.status(500).json({
        success:"false",
        message:"Error occured"
    })
}
}
module.exports = {
    handleCreateNewUser: handleCreateNewUser,
    handleUserLogin: handleUserLogin
}