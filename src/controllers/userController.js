const { log } = require("common");
const userService = require("../services/userService");
const token = require("./../Utils/token");

let handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        const dataRefreshToken = await token.verifyRefreshToken(refreshToken);
        console.log({ dataRefreshToken });
        const user_id = data.user_id;
        const accessToken = token.generateAccessToken({ user_id });
        res.status(201).json({
            success: "true",
            message: "Refresh token successfully",
            data: {
                accessToken,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: "Error occured",
        });
    }
};
let handleCreateNewUser = async (req, res) => {
    userService
        .createNewUSer(req.body)
        .then((result) => {
            res.status(201).json({
                result,
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};
let handleUserLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({
                success: "false",
                message: "Missing required parameters",
            });
        }
        let userWithPassword = await userService.handleLogin(email, password);
        if (userWithPassword) {
            const user_id = userWithPassword.user_id;
            const accessToken = token.generateAccessToken({ user_id });
            // const accessToken = "AT";
            const refreshToken = token.generateRefreshToken({ user_id });
            const { password, ...user } = userWithPassword;
            // res.set("Access-Control-Expose-Headers", "set-cookie");
            res.cookie("refreshToken", refreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: "/",
                sameSite: "Strict",
                secure: false,
            });
            return res.status(200).json({
                success: "true",
                message: "Login successfully",
                user,
                accessToken,
                // refreshToken,
            });
        } else {
            return res.status(400).json({
                success: "false",
                message: "Incorrect email or password",
            });
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).json({
            success: "false",
            message: "Error occured",
        });
    }
};

const handleFindUserByUserName = (req, res) => {
    userService
        .findUserByUserName(req.query.user_name)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

const handleEditUser = (req, res) => {
    const preData = req.body;
    const data = { ...preData, user_id: req.params.user_id };
    userService
        .editUser(data)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
module.exports = {
    handleCreateNewUser,
    handleUserLogin,
    handleRefreshToken,
    handleFindUserByUserName,
    handleEditUser,
};
