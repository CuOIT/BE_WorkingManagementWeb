const db = require("../models/index");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");
let checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: {
            email: email,
        },
        raw: true,
    });
    return user ? true : false;
};
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await argon2.hash(password);
            resolve(hashedPassword);
        } catch (error) {
            reject({ error });
        }
        // try {
        //     console.log({ password, salt });
        //     bcrypt.hash(password, salt, (error, hash) => {
        //         console.log("HASHED");
        //         if (error) {
        //             console.log({ error });
        //             reject({ error });
        //         } else {
        //             console.log({ hash });
        //             resolve({ hash });
        //         }
        //     });
        //     // console.log({ hashedPassword });
        //     // resolve(hashedPassword
        // } catch (error) {
        //     reject(error);
        // }
    });
};
const compareHashPassword = async (hashPassword, password) => {
    try {
        const passwordMatch = await argon2.verify(hashPassword, password);
        return passwordMatch;
    } catch (error) {
        // Handle any errors that occurred during password verification
        return false;
    }
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
            const hashPass = await hashPassword(password);
            let compared = await compareHashPassword(hashPass, password);
            if (compared) {
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
                console.log({ in: data.user_password });
                let password = await hashPassword(data.user_password);
                console.log({ password });
                db.User.create({
                    email: data.email,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    user_name: data.user_name,
                    password,
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
            console.log({ error });
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
