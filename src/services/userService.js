const db = require("../models/index");
const { Op } = require("sequelize");
let checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: {
            email: email,
        },
        raw: true,
    });
    return user ? true : false;
};
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await bcrypt.hashSync(password, salt);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
};
let handleLogin = async (email, password) => {
    let checkUserExist = await checkEmailExist(email);
    if (checkUserExist) {
        let user = await db.User.findOne({
            where: {
                email: email,
            },
            raw: true,
        });
        if (user) {
            let checkPassword = password === user.password;
            if (checkPassword) {
                delete user.password;
                return user;
            }
        }
    } else {
        return null;
    }
};
let createNewUSer = (data) => {
    console.log({ data });
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmailExist(data.email);
            if (check === true) {
                reject({
                    success: "false",
                    message: "Your email's already existed",
                });
            } else {
                // let password = await hashPassword(data.password);
                db.User.create({
                    email: data.email,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    user_name: data.user_name,
                    password: data.user_password,
                    phone: data.phone,
                    birthday: data.birthday,
                })
                    .then((result) =>
                        resolve({
                            success: "true",
                            message: "Create account successfully",
                        })
                    )
                    .catch((error) => {
                        console.log({ error });
                        reject({
                            success: "false",
                            message: "Error occured",
                        });
                    });
            }
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userToDelete = await db.User.findOne({
                where: { user_id: id },
            });

            if (userToDelete) {
                await db.User.destroy({
                    where: { user_id: id },
                });
                resolve({
                    status: 204,
                    success: "true",
                    message: "Successfully deleted",
                });
            } else {
                resolve({
                    success: "true",
                    message: "User not exist",
                });
            }
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    user_id: data.user_id,
                },
            });
            if (!user) {
                reject({
                    success: "false",
                    message: "Cannot find the user",
                });
            }
            user.user_name = data.user_name;
            user.email = data.email;
            user.birthday = data.birthday;
            user.last_name = data.last_name;
            user.first_name = data.first_name;
            user.gender = data.gender;
            user.phone = data.phone;
            user.avt = data.avt;
            console.log({ user });
            user.save();
            resolve({
                success: "true",
                message: "Update user successfully",
            });
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

const findUserByUserName = (user_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const matches = await db.User.findAll({
                attributes: ["user_id", "user_name"],
                where: {
                    user_name: {
                        [Op.like]: `%${user_name}%`,
                    },
                },
            });
            resolve({
                success: "true",
                message: "Successfully",
                data: matches,
            });
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};
module.exports = {
    checkEmailExist: checkEmailExist,
    createNewUSer: createNewUSer,
    findUserByUserName,
    handleLogin: handleLogin,
    editUser,
};
